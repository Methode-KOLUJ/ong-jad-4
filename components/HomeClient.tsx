'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import Mission from './Mission';
import Partenaire from './Partenaire';

// Hero Carousel Component
const HeroCarousel = () => {
  const carouselImages = [
    '/Activites/Slide2.jpeg',
    '/Activites/Slide3.jpeg',
    '/Activites/Slide4.jpeg',
    '/Activites/Slide5.jpeg',
    '/Activites/Slide6.jpeg',

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group">
      {/* Images */}
      {carouselImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/70 to-green-600/70 dark:from-blue-900/80 dark:to-green-900/80"></div>
        </motion.div>
      ))}

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center p-8">
          <p className="font-extrabold text-white drop-shadow-lg group-hover:scale-104 transition-transform text-xl md:text-2xl">
            " Donner c'est vider votre présent pour remplir votre futur "
          </p>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
              ? 'bg-white w-8'
              : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function HomeClient() {
  return (
    <div className="overflow-x-hidden bg-white dark:bg-[#020617] transition-colors">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-[#020617] dark:to-[#0f172a] pt-20 pb-10 md:pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400/20 dark:bg-green-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Ensemble pour l'avenir
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 dark:text-white">
              Agissons <span className="text-blue-600 dark:text-blue-400">aujourd'hui</span> pour un monde <span className="text-green-600 dark:text-green-400">meilleur</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Notre ONG s'engage à apporter des solutions durables aux communautés vulnérables. Éducation, santé, et développement sont au cœur de notre mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/don" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-green-600/20 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Faire un don
              </Link>
              <Link href="/adhesion" className="px-8 py-4 bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 dark:bg-white/5 dark:text-white dark:border-slate-700 dark:hover:border-blue-400 dark:hover:text-blue-400">
                Nous rejoindre
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <HeroCarousel />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-[#020617] dark:to-[#0f172a] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/images/About.jpg"
                  alt="Notre équipe en action"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="w-1/2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Heart className="text-white" size={24} fill="currentColor" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">+1.000</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Personnes servies</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-blue-600 text-white rounded-2xl p-4 md:p-6 shadow-xl"
              >
                <p className="text-2xl md:text-3xl font-bold">3+</p>
                <p className="text-xs md:text-sm opacity-90">Années d'expérience</p>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800" // Added dark border
              >
                À propos de nous
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-6 dark:text-white"
              >
                Qui sommes-nous ?
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4 }}
                className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8"
              >
                <p>
                  <strong className="text-gray-900 dark:text-white">L'ONG JAD</strong> est une organisation à but non lucratif dédiée à la transformation sociale et au développement durable. Depuis sa création en 2022, elle s'engage à promouvoir : l'éducation, la santé, l'entreprenariat, l'assistance aux veuves et orphelins, le développement personnel ainsi que les actions évangéliques.
                </p>
                <p>
                  Notre <strong className="text-blue-600 dark:text-blue-400">mission</strong>  est de créer un impact durable en rassemblant des ressources humaines, financières, et matérielles pour répondre aux besoins les plus pressants des <strong className="text-green-600 dark:text-green-400">populations vulnérables</strong> .
                </p>
                <p>
                  Rejoignez-nous dans notre mission pour construire un avenir meilleur en devenant membres effectifs, membres sympathisants, ou membres d'honneur. Vous pouvez aussi devenir donateur.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4 md:gap-6"
              >
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 md:p-4 border border-blue-100 dark:border-blue-800">
                  <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">5+</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Projets réalisés</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 md:p-4 border border-green-100 dark:border-green-800">
                  <p className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">10+</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Partenaires actifs</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link
                  href="/adhesion"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/20"
                >
                  Rejoignez notre mission
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <Mission />

      {/* Partners Section */}
      <Partenaire />
    </div>
  );
}
