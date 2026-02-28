import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import ArticleHero from '@/components/ArticleHero';
import ShareButtons from '@/components/ShareButtons';

async function getPost(slug: string) {
    await dbConnect();
    const post = await Post.findOne({ slug }).lean();
    if (!post) return null;
    return JSON.parse(JSON.stringify(post));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return constructMetadata({
            title: "Article introuvable",
            noIndex: true
        });
    }

    return constructMetadata({
        title: `${post.title} - ONG JAD`,
        description: post.excerpt || post.title,
        image: post.imageUrl
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="premium-article min-h-screen bg-[#fafaf9] dark:bg-[#020617] transition-colors duration-500">
            <ArticleHero post={post} />

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-24 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent translate-y-[-1px]" />

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Sticky Sidebar */}
                    <aside className="lg:w-20 hidden lg:block">
                        <div className="sticky top-40">
                            <ShareButtons title={post.title} slug={post.slug} />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <Link href="/actualites" className="inline-flex items-center gap-4 text-2xl mb-8 font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-600 transition-all group">
                            <ArrowLeft size={28} className="group-hover:-translate-x-2 transition-transform" />
                            Retour
                        </Link>

                        <div
                            className="prose prose-zinc prose-lg md:prose-2xl dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <div className="lg:hidden mt-8 p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xl">
                            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Partager cet article</p>
                            <div className="flex justify-center">
                                <ShareButtons title={post.title} slug={post.slug} />
                            </div>
                        </div>

                        <footer className="mt-32 pt-16 border-t border-gray-100 dark:border-slate-800">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                                <div className="flex items-center gap-6">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed">Promouvoir l'entrepreneuriat par l'action <br /> concrète sur le terrain.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Link href={"/adhesion"} className="px-10 py-5 rounded-[1.2rem] bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-black/20 dark:shadow-white/10">
                                        Rejoindre l'ONG JAD
                                    </Link>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </article>
    );
}
