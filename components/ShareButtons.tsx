'use client';

import {
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Link2,
    Check,
    MessageCircle
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonsProps {
    title: string;
    slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'hover:text-[#1877F2] hover:border-[#1877F2]/20'
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: 'hover:text-[#1DA1F2] hover:border-[#1DA1F2]/20'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/20'
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
            color: 'hover:text-[#25D366] hover:border-[#25D366]/20'
        }
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="flex flex-col gap-4 relative">
            {/* Desktop Share Button with Popover */}
            <div className="relative group">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all shadow-xl backdrop-blur-xl ${isOpen
                        ? 'bg-blue-600 border-blue-600 text-white shadow-blue-600/30'
                        : 'bg-white dark:bg-[#0f172a]/50 border-gray-100 dark:border-slate-800 text-gray-400 hover:text-blue-600 hover:border-blue-600/20'
                        }`}
                >
                    <Share2 size={24} className={isOpen ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute left-1/2 -translate-x-1/2 lg:left-full lg:translate-x-0 lg:ml-4 bottom-full mb-4 lg:bottom-auto lg:top-0 flex flex-row items-center gap-2 p-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-2xl z-50 backdrop-blur-xl"
                        >
                            {shareLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={`Partager sur ${link.name}`}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all bg-gray-50 dark:bg-slate-800/50 border border-transparent ${link.color}`}
                                >
                                    <link.icon size={20} />
                                </a>
                            ))}
                            <div className="w-px h-8 bg-gray-200 dark:bg-slate-800 mx-1" />
                            <button
                                onClick={copyToClipboard}
                                title="Copy link"
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all bg-gray-50 dark:bg-slate-800/50 border border-transparent hover:text-blue-600 hover:border-blue-600/20`}
                            >
                                {copied ? <Check size={20} className="text-green-500" /> : <Link2 size={20} />}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
