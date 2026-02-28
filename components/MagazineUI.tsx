'use client';

import Link from 'next/link';
import { Calendar, ArrowRight, Search, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { IPost } from '@/lib/models/Post';

interface MagazineUIProps {
    posts: IPost[];
    q?: string;
}

export default function MagazineUI({ posts, q }: MagazineUIProps) {
    const featuredPost = posts.length > 0 ? posts[0] : null;
    const remainingPosts = posts.length > 1 ? posts.slice(1) : [];

    return (
        <div className="min-h-screen bg-[#fafaf9] dark:bg-[#020617] transition-colors duration-500">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
                >
                    <div className="max-w-2xl">
                        <h1 className="text-4xl italic uppercase md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 dark:text-white tracking-tighter leading-[0.9]">
                            à la une !                        </h1>
                    </div>

                    <form action="/actualites" className="relative w-full md:w-80 group">
                        <input
                            type="text"
                            name="q"
                            placeholder="Rechercher..."
                            defaultValue={q || ''}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-600/20 outline-none bg-white dark:bg-slate-900/50 backdrop-blur-xl transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 group-hover:shadow-md border border-gray-100 dark:border-slate-800"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
                    </form>
                </motion.div>

                {/* Featured Post */}
                {!q && featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-32"
                    >
                        <Link href={`/actualites/${featuredPost.slug}`} className="group relative block overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-500 hover:scale-[1.005]">
                            <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">
                                <div className="h-64 sm:h-[500px] lg:h-[700px] relative overflow-hidden">
                                    <img
                                        src={featuredPost.imageUrl}
                                        alt={featuredPost.title}
                                        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                                </div>
                                <div className="p-6 sm:p-8 md:p-12 lg:p-20 flex flex-col justify-center bg-white dark:bg-slate-900 lg:border-l border-t lg:border-t-0 border-gray-50 dark:border-slate-800">
                                    <div className="flex items-center flex-wrap gap-2 sm:gap-4 mb-8">
                                        {featuredPost.tags.map((tag: string) => (
                                            <span key={tag} className="px-3 py-1 sm:px-4 sm:py-1.5 truncate max-w-full inline-block min-w-0 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                        <span className="text-gray-400 dark:text-gray-500 shrink-0 text-sm flex items-center gap-1.5 uppercase tracking-wider font-medium">
                                            <Clock size={14} /> 5 min read
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl break-words font-serif font-bold mb-8 dark:text-white leading-[1] transition-colors group-hover:text-blue-600">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 line-clamp-3 leading-relaxed font-light">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center gap-6 group/btn">
                                        <span className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12 shadow-lg shadow-blue-600/30">
                                            <ArrowRight size={24} />
                                        </span>
                                        <span className="text-xl font-bold dark:text-white group-hover/btn:text-blue-600 transition-colors">Continuer la lecture</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {posts.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-slate-800">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 dark:bg-slate-800 mb-6 text-gray-400">
                            <Search size={32} />
                        </div>
                        <p className="text-2xl font-serif text-gray-500 dark:text-gray-400">
                            Aucun récit n'a été trouvé {q && `pour "${q}"`}.
                        </p>
                        <Link href="/actualites" className="inline-block mt-8 text-blue-600 font-semibold hover:underline">
                            Voir tous les articles
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-16 border-b border-gray-100 dark:border-slate-800 pb-10">
                            <h3 className="text-3xl font-serif font-bold dark:text-white">
                                {q ? `Résultats pour "${q}"` : "Éditions récentes"}
                            </h3>
                            {!q && <span className="hidden md:block text-sm text-gray-400 uppercase tracking-widest font-black">{remainingPosts.length} Articles</span>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-12 lg:gap-x-12 lg:gap-y-20">
                            {(q ? posts : remainingPosts).map((post: IPost, index: number) => (
                                <motion.div
                                    key={post._id as unknown as string}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={`/actualites/${post.slug}`}
                                        className="group flex flex-col bg-transparent h-full"
                                    >
                                        <div className="aspect-video sm:aspect-[4/5] relative overflow-hidden rounded-[2rem] mb-6 sm:mb-8 shadow-sm">
                                            <img
                                                src={post.imageUrl}
                                                alt={post.title}
                                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex flex-wrap gap-2 overflow-hidden pointer-events-none">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="px-2.5 py-1 sm:px-3 sm:py-1 inline-block min-w-0 max-w-full truncate bg-white/95 dark:bg-slate-950/90 backdrop-blur rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 shadow-xl">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col flex-1 pl-2">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-4">
                                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                                <span className="w-1 h-1 rounded-full bg-blue-600" />
                                                <span>{post.readTime || '4 min watch'}</span>
                                            </div>

                                            <h4 className="text-xl sm:text-2xl break-words font-serif font-bold mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors dark:text-white leading-tight">
                                                {post.title}
                                            </h4>

                                            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 line-clamp-3 leading-relaxed font-light text-base sm:text-lg">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300 text-blue-600 dark:text-blue-400">
                                                Explorer <ChevronRight size={14} />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
