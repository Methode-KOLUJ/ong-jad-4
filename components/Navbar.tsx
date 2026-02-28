'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Adhésion', href: '/adhesion' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-[#020617]/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <Image src="/images/Logo.png" alt="Logo" width={50} height={50} />
            <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-gray-900 dark:text-white">ONG JAD</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-medium transition-colors py-1 ${isActive(link.href)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                  }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {mounted && (
              <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-full p-1 border border-gray-200 dark:border-slate-700 mx-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-2 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-white text-yellow-500 shadow-sm scale-110' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                  aria-label="Thème Clair"
                >
                  <Sun size={18} fill={theme === 'light' ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-slate-700 text-blue-400 shadow-sm scale-110' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                  aria-label="Thème Sombre"
                >
                  <Moon size={18} fill={theme === 'dark' ? "currentColor" : "none"} />
                </button>
              </div>
            )}

            <Link
              href="/don"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-green-600/20"
            >
              <Heart size={18} fill="currentColor" />
              Faire un don
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {mounted && (
              <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-full p-1 border border-gray-200 dark:border-slate-700">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-1.5 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-white text-yellow-500 shadow-sm' : 'text-gray-400'}`}
                >
                  <Sun size={16} fill={theme === 'light' ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-1.5 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-slate-700 text-blue-400 shadow-sm' : 'text-gray-400'}`}
                >
                  <Moon size={16} fill={theme === 'dark' ? "currentColor" : "none"} />
                </button>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none dark:text-gray-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 dark:bg-[#020617] dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive(link.href)
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-800/50 dark:hover:text-blue-400'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/don"
                onClick={() => setIsOpen(false)}
                className="w-full mt-4 flex justify-center items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                <Heart size={18} fill="currentColor" />
                Faire un don
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
