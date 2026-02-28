'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <footer className="bg-gray-100 border-t border-gray-200 text-gray-900 pt-16 pb-8 dark:bg-[#020617] dark:border-slate-800 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              {/* <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/20">
                 JAD
               </div> */}
              <span className="font-extrabold text-xl md:text-2xl tracking-tight text-gray-900 dark:text-white">ONG JAD</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Nous œuvrons chaque jour pour un monde meilleur, en apportant de l'aide là où elle est la plus nécessaire. Rejoignez notre mouvement pour le changement.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-blue-600 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-blue-400 dark:text-gray-200 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/ongjaddrc?igsh=MXhpdGRieGtmYzBxcg%3D%3D&utm_source=qr" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-pink-600 dark:text-gray-200 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-red-600 dark:text-gray-200 hover:bg-red-600 hover:text-white dark:hover:bg-red-700 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Navigation</h3>
            <ul className="space-y-4">
              <li><Link href="/" className={`transition-colors ${isActive('/') ? 'text-blue-600 dark:text-white font-semibold' : 'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'}`}>Accueil</Link></li>
              <li><Link href="/actualites" className={`transition-colors ${isActive('/actualites') ? 'text-blue-600 dark:text-white font-semibold' : 'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'}`}>Actualités</Link></li>
              <li><Link href="/adhesion" className={`transition-colors ${isActive('/adhesion') ? 'text-blue-600 dark:text-white font-semibold' : 'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'}`}>Devenir membre</Link></li>
              <li><Link href="/don" className={`transition-colors ${isActive('/don') ? 'text-blue-600 dark:text-white font-semibold' : 'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'}`}>Faire un don</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Informations</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">Gestion des cookies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <MapPin size={20} className="mt-1 text-blue-500 shrink-0" />
                <span>Lubumbashi, Commune Annexe, Golf plateau 4, Quartier Oasis, Av kakunta référence : Marchée Kyungu</span>
              </li>
              <a href="tel:+243976080083" className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone size={20} className="text-green-500 shrink-0" />
                <span>+243 97 60 800 83</span>
              </a>
              <a href="mailto:contact@ongjad.com" className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail size={20} className="text-yellow-500 shrink-0" />
                <span>contact@ongjad.com</span>
              </a>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {currentYear} ONG JAD. Tous droits réservés.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span>Fait avec</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>par <a href="https://kolujdev.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium">KOLUJ_DEV</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
