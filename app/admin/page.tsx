'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash, Eye, Check, X, Save, Edit, Loader2, Lock, LogOut, FileText, Users, Search } from 'lucide-react';
import TiptapEditor from '@/components/TiptapEditor'; // Assuming this component exists and works
import Link from 'next/link';

interface Post {
    _id: string;
    title: string;
    slug: string;
    content: string;
    imageUrl: string;
    excerpt: string;
    tags: string[];
    createdAt: string;
}

interface Adhesion {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    profession: string;
    createdAt: string;
    status: string;
}

export default function AdminPage() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [passwordInput, setPasswordInput] = useState('');
    const [loginError, setLoginError] = useState('');

    // Dashboard State
    const [activeTab, setActiveTab] = useState('posts');
    const [posts, setPosts] = useState<Post[]>([]);
    const [adhesions, setAdhesions] = useState<Adhesion[]>([]);
    const [loadingData, setLoadingData] = useState(false);

    // Filter/Search
    const [searchTerm, setSearchTerm] = useState('');

    // Form State (Posts)
    const [isCreating, setIsCreating] = useState(false);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        tags: ''
    });
    const [saving, setSaving] = useState(false);

    // Initial Auth Check
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/admin/check');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setIsAuthenticated(true);
                    }
                }
            } catch (err) {
                console.error('Session check failed', err);
            } finally {
                setAuthLoading(false);
            }
        };
        checkAuth();
    }, []);

    // Fetch Data when Tab Changes
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchData = async () => {
            setLoadingData(true);
            try {
                if (activeTab === 'posts') {
                    const res = await fetch('/api/posts');
                    if (res.status === 401) {
                        setIsAuthenticated(false);
                        return;
                    }
                    const data = await res.json();
                    if (Array.isArray(data)) setPosts(data);
                } else if (activeTab === 'adhesions') {
                    const res = await fetch('/api/adhesion');
                    if (res.status === 401) {
                        setIsAuthenticated(false);
                        return;
                    }
                    const data = await res.json();
                    if (Array.isArray(data)) setAdhesions(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [activeTab, isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: passwordInput })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setIsAuthenticated(true);
            } else {
                setLoginError(data.error || 'Mot de passe incorrect');
            }
        } catch (err) {
            setLoginError('Erreur de connexion');
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            setIsAuthenticated(false);
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const tagsArray = typeof formData.tags === 'string'
                ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
                : formData.tags;

            const method = editingPostId ? 'PUT' : 'POST';
            const bodyData = editingPostId ? { _id: editingPostId, ...formData, tags: tagsArray } : { ...formData, tags: tagsArray };

            const res = await fetch('/api/posts', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            });

            if (res.ok) {
                const savedPost = (await res.json()).post;
                if (editingPostId) {
                    setPosts(posts.map(p => p._id === editingPostId ? savedPost : p));
                    alert('Article modifié avec succès !');
                } else {
                    setPosts([savedPost, ...posts]);
                    alert('Article publié avec succès !');
                }
                setIsCreating(false);
                setEditingPostId(null);
                setFormData({ title: '', slug: '', excerpt: '', content: '', imageUrl: '', tags: '' });
            } else {
                alert('Erreur lors de la sauvegarde');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleEditPost = (post: Post) => {
        setEditingPostId(post._id);
        setFormData({
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            imageUrl: post.imageUrl || '',
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : ''
        });
        setIsCreating(true);
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;
        try {
            const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter(p => p._id !== id));
            } else {
                alert('Erreur lors de la suppression');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteAdhesion = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) return;
        try {
            const res = await fetch(`/api/adhesion?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setAdhesions(adhesions.filter(a => a._id !== id));
            } else {
                alert('Erreur lors de la suppression');
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020617] dark:text-white">Chargement...</div>;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020617] p-4 transition-colors">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-slate-800">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-2xl font-bold dark:text-white">Accès administrateur</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Veuillez entrer le mot de passe administrateur</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full p-4 rounded-xl border bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                placeholder="Mot de passe"
                            />
                        </div>
                        {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
                        <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredAdhesions = adhesions.filter(a =>
        a.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#020617] transition-colors">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 z-50 h-16 flex items-center px-4 md:px-8 justify-between">
                <Link href={'/'}><span className="font-extrabold text-xl dark:text-white">Tableau de bord</span></Link>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Revenir au site</Link>
                    <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Déconnexion">
                        <LogOut size={20} />
                    </button>
                </div>
            </nav>

            <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-gray-100 dark:border-slate-800">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${activeTab === 'posts'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <FileText size={18} /> Articles
                        </button>
                        <button
                            onClick={() => setActiveTab('adhesions')}
                            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${activeTab === 'adhesions'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <Users size={18} /> Adhésions
                        </button>
                    </div>

                    {!isCreating && (
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 rounded-xl border bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 dark:text-white"
                            />
                        </div>
                    )}
                </div>

                {isCreating ? (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-900">
                            <h2 className="text-lg font-bold dark:text-white flex items-center gap-2">
                                {editingPostId ? <Edit className="text-blue-600" size={20} /> : <Plus className="text-blue-600" size={20} />}
                                {editingPostId ? 'Modifier Article' : 'Nouvel Article'}
                            </h2>
                            <button onClick={() => {
                                setIsCreating(false);
                                setEditingPostId(null);
                                setFormData({ title: '', slug: '', excerpt: '', content: '', imageUrl: '', tags: '' });
                            }} className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Annuler</button>
                        </div>
                        <div className="p-8">
                            <form onSubmit={handleCreatePost} className="space-y-8 max-w-4xl mx-auto">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Titre de l'article</label>
                                            <input
                                                required
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                                placeholder="Un titre accrocheur"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Slug URL (Optionnel)</label>
                                            <input
                                                value={formData.slug}
                                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-mono text-sm"
                                                placeholder="mon-super-article"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Image de couverture</label>
                                        <div className="border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                            {formData.imageUrl ? (
                                                <div className="relative">
                                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
                                                    >
                                                        <Trash size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const uploadData = new FormData();
                                                                uploadData.append('file', file);
                                                                try {
                                                                    const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
                                                                    const data = await res.json();
                                                                    if (data.url) setFormData({ ...formData, imageUrl: data.url });
                                                                } catch { alert("Erreur d'upload"); }
                                                            }
                                                        }}
                                                        className="hidden"
                                                        id="coverImageInput"
                                                    />
                                                    <label htmlFor="coverImageInput" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500">
                                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                                            <Plus size={20} />
                                                        </div>
                                                        <span className="text-sm font-medium text-blue-600">Cliquez pour uploader</span>
                                                        <span className="text-xs">PNG, JPG jusqu'à 5MB</span>
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Description courte</label>
                                    <textarea
                                        required
                                        rows={2}
                                        value={formData.excerpt}
                                        onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                        placeholder="Un résumé pour les cartes d'aperçu..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Contenu</label>
                                    <div className="prose-admin">
                                        <TiptapEditor
                                            content={formData.content}
                                            onChange={(html) => setFormData({ ...formData, content: html })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Tags</label>
                                    <input
                                        value={formData.tags}
                                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                        className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                        placeholder="éducation, santé, développement..."
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 flex items-center gap-2"
                                    >
                                        {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                        {editingPostId ? "Enregistrer" : "Publier"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'posts' && (
                            <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-900">
                                    <h2 className="font-bold dark:text-white">Tous les articles ({filteredPosts.length})</h2>
                                    <button
                                        onClick={() => {
                                            setEditingPostId(null);
                                            setFormData({ title: '', slug: '', excerpt: '', content: '', imageUrl: '', tags: '' });
                                            setIsCreating(true);
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
                                    >
                                        <Plus size={16} /> Créer un article
                                    </button>
                                </div>

                                {loadingData ? (
                                    <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                                                    <th className="p-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Titre</th>
                                                    <th className="p-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Date</th>
                                                    <th className="p-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                                {filteredPosts.map(p => (
                                                    <tr key={p._id} className="group hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                                        <td className="p-4">
                                                            <div className="font-medium dark:text-gray-200">{p.title}</div>
                                                            <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">{p.excerpt}</div>
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                                            {new Date(p.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Link href={`/actualites/${p.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                                    <Eye size={18} />
                                                                </Link>
                                                                <button onClick={() => handleEditPost(p)} className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                                                                    <Edit size={18} />
                                                                </button>
                                                                <button onClick={() => handleDeletePost(p._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                                    <Trash size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {filteredPosts.length === 0 && (
                                                    <tr>
                                                        <td colSpan={3} className="p-12 text-center text-gray-500 dark:text-gray-400">
                                                            Aucun article trouvé.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'adhesions' && (
                            <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900 text-right">
                                    <span className="text-sm text-gray-500">{filteredAdhesions.length} demandes</span>
                                </div>

                                {loadingData ? (
                                    <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                                                    <th className="p-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Demandeur</th>
                                                    <th className="p-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Contact</th>
                                                    <th className="p-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Profession</th>
                                                    <th className="p-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Date</th>
                                                    <th className="p-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                                {filteredAdhesions.map(a => (
                                                    <tr key={a._id} className="group hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                                        <td className="p-4">
                                                            <div className="font-bold dark:text-white capitalize">{a.nom} {a.prenom}</div>
                                                        </td>
                                                        <td className="p-4 text-sm">
                                                            <div className="dark:text-gray-300">{a.email}</div>
                                                            <div className="text-gray-500 text-xs">{a.telephone}</div>
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                                                            {a.profession}
                                                        </td>
                                                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                                            {new Date(a.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <button onClick={() => handleDeleteAdhesion(a._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                                <Trash size={18} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {filteredAdhesions.length === 0 && (
                                                    <tr>
                                                        <td colSpan={5} className="p-12 text-center text-gray-500 dark:text-gray-400">
                                                            Aucune demande d'adhésion trouvée.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
