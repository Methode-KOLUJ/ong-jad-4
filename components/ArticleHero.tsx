'use client';

import { motion } from 'framer-motion';
import { Calendar, User, Clock } from 'lucide-react';

interface ArticleHeroProps {
    post: {
        title: string;
        imageUrl: string;
        tags: string[];
        createdAt: string;
        readTime?: string;
    };
}

export default function ArticleHero({ post }: ArticleHeroProps) {
    return (
        <header className="relative h-[65vh] md:h-[85vh] w-full overflow-hidden">
            <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] dark:from-[#020617] via-[#020617]/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-32">
                <div className="max-w-7xl mx-auto px-4 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-10 w-full">
                            {post.tags?.map((tag: string) => (
                                <span key={tag} className="px-3 py-1.5 sm:px-5 sm:py-2 max-w-full break-all inline-block min-w-0 bg-blue-600 text-white rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-2xl">{tag}</span>
                            ))}
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-7xl break-words font-serif font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 leading-tight sm:leading-[0.85] tracking-tighter">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-10 text-gray-600 dark:text-gray-300 font-medium">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 flex items-center justify-center text-white shadow-xl">
                                    <User size={20} />
                                </div>
                                <span className="uppercase tracking-[0.2em] text-[10px] font-black">Équipe JAD</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center text-gray-400 shadow-sm">
                                    <Calendar size={20} />
                                </div>
                                <span className="uppercase tracking-[0.2em] text-[10px] font-black">{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center text-gray-400 shadow-sm">
                                    <Clock size={20} />
                                </div>
                                <span className="uppercase tracking-[0.2em] text-[10px] font-black">{post.readTime || '6 MIN'} READ</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
