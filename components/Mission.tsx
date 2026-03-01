'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Briefcase, Activity, BookOpen, Stethoscope, HandHeart, MessageCircle, ExternalLink, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
        <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
        <path d="M9.5 13a5 5 0 0 0 5 0" />
    </svg>
);

const TikTokIcon = ({ size = 24 }: { size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const domains = [
    {
        title: 'Actions évangéliques',
        icon: <Heart />,
        desc: 'Propagation de la foi et soutien spirituel aux communautés, en favorisant l\'unité et l\'amour du prochain.',
        socials: [
            { icon: <Facebook size={18} />, url: 'https://www.facebook.com/share/17F9XxTejo/?mibextid=wwXIfr', color: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30' },
            { icon: <WhatsAppIcon size={18} />, url: 'https://chat.whatsapp.com/LPYzZ4zDCVM8G7zP3viz5H?mode=gi_t', color: 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30' },
            { icon: <TikTokIcon size={18} />, url: 'www.tiktok.com/@megexpose.pour.ma', color: ' flex items-center justify-center text-black dark:text-gray-200 hover:bg-black hover:text-white dark:hover:bg-black transition-colors' },
            { icon: <Instagram size={18} />, url: 'https://www.instagram.com/7000leaders?igsh=ZmRqMHF3ZTMyNTF5&utm_source=qr', color: 'flex items-center justify-center text-pink-600 dark:text-gray-200 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-colors' }
        ]
    },
    {
        title: 'Entreprenariat',
        icon: <Briefcase />,
        desc: 'Promotion de l\'entrepreneuriat et du développement économique des communautés défavorisées.',
        socials: [
            { icon: <Facebook size={18} />, url: 'https://www.facebook.com/share/17F9XxTejo/?mibextid=wwXIfr', color: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30' },
        ]
    },
    {
        title: 'Développement personnel',
        icon: <Activity />,
        desc: 'Ateliers et formations pour aider chacun à découvrir son potentiel, renforcer sa confiance et atteindre ses objectifs.',
        socials: [
            { icon: <Facebook size={18} />, url: '#', color: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30' }
        ]
    },
    {
        title: 'Education',
        icon: <BookOpen />,
        desc: 'Soutien scolaire, alphabétisation et accès aux ressources éducatives pour garantir un avenir meilleur aux enfants.',
        socials: [
            { icon: <WhatsAppIcon size={18} />, url: 'https://chat.whatsapp.com/JXBBdRMTZdGEWKDCvgIIop?mode=gi_t', color: 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30' },
            { icon: <Instagram size={18} />, url: 'https://www.instagram.com/7000leaders?igsh=ZmRqMHF3ZTMyNTF5&utm_source=qr', color: 'flex items-center justify-center text-pink-600 dark:text-gray-200 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-colors' }
        ]
    },
    {
        title: 'Santé',
        icon: <Stethoscope />,
        desc: 'Accès aux soins primaires, campagnes de vaccination et sensibilisation à l\'hygiène pour des communautés en bonne santé.',
        socials: [
            { icon: <Facebook size={18} />, url: '#', color: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30' },
        ]
    },
    {
        title: 'Assistance',
        icon: <HandHeart />,
        desc: 'Aide d\'urgence et soutien matériel aux personnes en situation de précarité ou victimes de catastrophes.',
        socials: [
            { icon: <Facebook size={18} />, url: '#', color: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30' }
        ]
    },
    {
        title: 'Coaching',
        icon: <MessageCircle />,
        desc: 'Mentorat individuel et de groupe pour accompagner les jeunes et les entrepreneurs dans leurs projets de vie.',
        socials: [
            { icon: <WhatsAppIcon size={18} />, url: 'https://chat.whatsapp.com/JXBBdRMTZdGEWKDCvgIIop?mode=gi_t', color: 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30' },
            { icon: <Instagram size={18} />, url: 'https://www.instagram.com/7000leaders?igsh=ZmRqMHF3ZTMyNTF5&utm_source=qr', color: 'flex items-center justify-center text-pink-600 dark:text-gray-200 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-colors' }
        ]
    },
];

export default function Mission() {
    const [activeShare, setActiveShare] = useState<number | null>(null);

    const toggleShare = (index: number) => {
        if (activeShare === index) {
            setActiveShare(null);
        } else {
            setActiveShare(index);
        }
    };

    return (
        <section className="py-20 bg-white dark:bg-[#020617] transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white">Mission et Vision</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Nous croyons en un monde où chaque individu a la possibilité de s'épanouir dignement.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {domains.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 transition-all hover:shadow-lg dark:hover:shadow-blue-900/10 relative z-0"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                                    {item.icon}
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => toggleShare(i)}
                                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50 dark:hover:bg-slate-800 z-10"
                                        title="Visiter nos réseaux sociaux"
                                    >
                                        <ExternalLink size={20} />
                                    </button>

                                    <AnimatePresence>
                                        {activeShare === i && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                                className="absolute right-0 top-full mt-2 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 flex gap-1 z-50"
                                            >
                                                {item.socials.map((social, sIdx) => (
                                                    <a
                                                        key={sIdx}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`p-2 rounded-lg transition-colors ${social.color}`}
                                                    >
                                                        {social.icon}
                                                    </a>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-4 dark:text-white">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
