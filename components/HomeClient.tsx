'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Users, Globe, Shield, Activity, X, BookOpen, Stethoscope, HandHeart, MessageCircle, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';

// Mock Data
interface Partner {
  name: string;
  logo: string;
  description: string;
  website?: string;
}

const partners: Partner[] = [
  {
    name: 'Aqua Pischon',
    logo: '/partners/Aqua.jpeg',
    description: "",
    website: '#'
  },
  {
    name: 'Atlantic traiteur',
    logo: '/partners/Atlantic.jpeg',
    description: "Atlantic Traiteur est un service traiteur haut de gamme basé à Lubumbashi, spécialisé dans la création d’événements mémorables grâce à une cuisine raffinée et un accompagnement complet. Que ce soit pour des mariages, des événements professionnels ou des fêtes privées, l’équipe propose des menus personnalisés, des buffets élégants et une organisation sans stress, le tout avec des ingrédients frais et locaux, un service professionnel et une grande flexibilité pour s’adapter aux besoins et au budget de chaque client.",
    website: '#'
  },
  {
    name: 'Bora SARL',
    logo: '/partners/Bora.jpeg',
    description: '',
    website: '#'
  },
  {
    name: 'Jésus-Christ au Centre',
    logo: '/partners/Christ.jpeg',
    description: "Ce cabinet de consultants bibliques intervient dans le monde entier, particulièrement en RDC, pour approfondir la compréhension des Écritures à travers l’enseignement de l’herméneutique. Sa mission est d’offrir une expérience textuelle approfondie au service de l’Évangile et du perfectionnement des croyants, en faisant de chacun un ami de la Bible et de la personne de Christ. Il organise des conférences, des ateliers, des chambres de réforme, des consultations et des formations, guidé par son credo : faire de la Bible une amie pour mieux l’interpréter et placer Jésus-Christ au centre pour devenir une extension de Sa personne.",
    website: '#'
  },
  {
    name: 'Travel Booking',
    logo: '/partners/Travel.jpeg',
    description: "Nous sommes une agence de voyage internationale qui accompagne ses clients dans l’obtention de visas partout dans le monde. Spécialisée dans la vente de billets d’avion nationaux et internationaux, ainsi que dans le fret et la vente de véhicules, elle assure aussi le suivi complet des dossiers, incluant le remplissage des formulaires et les réservations confirmées de vols et d’hôtels.",
    website: '#'
  },
  {
    name: 'Focus Empire',
    logo: '/partners/Empire.jpeg',
    description: "Focus Empire se distingue par la création de clips vidéo, de spots publicitaires et la promotion de diverses formes d’art, tout en jouant un rôle clé dans l’industrie musicale grâce à la production, la promotion et le management d’artistes. L’agence offre également des services complets de publicité et marketing pour accroître la visibilité des produits et services, et met son expertise événementielle au service de l’organisation d’événements sur mesure. L’excellence y est une véritable promesse.",
    website: '#'
  },
  {
    name: 'Mission Evangélique de la Gloire',
    logo: '/partners/MEG.jpeg',
    description: "La Communauté Mission Évangélique la Gloire de la Deuxième Maison (MEG), située dans la Commune Annexe à Golf Plateau 4, œuvre pour le salut des âmes, la transformation spirituelle et sociale, le développement communautaire et le changement de mentalité. Guidée par les valeurs bibliques, elle accompagne chacun vers l’accomplissement de sa destinée en Christ et invite les fidèles à la retrouver à l’avenue Hon Mpanga n°70, près du Marché Kyungu.",
    website: '#'
  },
  {
    name: 'MLS SARL Construction',
    logo: '/partners/MLS.jpeg',
    description: "MLS SARL Construction est une entreprise active à Lubumbashi, Kolwezi, Kinshasa et Likasi, spécialisée dans la construction résidentielle et commerciale. Grâce à une équipe d’ingénieurs qualifiés, elle prend en charge chaque projet du début à la fin pour réaliser fidèlement la vision de ses clients, qu’il s’agisse d’une maison ou d’un bâtiment professionnel. Contact : +243 975 361 498 - +243 853 384 827 – maisonluabeyasolution@gmail.com",
    website: '#'
  },
  {
    name: 'Muzuri Realty',
    logo: '/partners/Muzuri.jpeg',
    description: "Notre agence immobilière, implantée à Kinshasa et Lubumbashi, offre des services complets allant de la location de suites, appartements, bureaux et maisons à la vente de terrains, parcelles et concessions, ainsi qu’à la gestion professionnelle de biens. Dynamique et innovante, elle accompagne ses clients avec des solutions sur mesure pour soutenir leurs projets et favoriser leur épanouissement socio-économique, avec une vision tournée vers l’ensemble du continent africain.",
    website: '#'
  },
  {
    name: 'HDesign Creative',
    logo: '/partners/Creative.jpeg',
    description: "Notre agence de création visuelle, active dans toute la RDC, accompagne les entreprises et professionnels dans la conception de logos, chartes graphiques et supports de communication (affiches, flyers, cartes de visite) afin de renforcer leur image de marque. L’équipe crée des visuels simples, percutants et adaptés aux besoins de chaque client pour favoriser une communication efficace et distinctive.",
    website: '#'
  },
];

const domains = [
  {
    title: 'Actions évangéliques',
    icon: <Heart />,
    desc: 'Propagation de la foi et soutien spirituel aux communautés, en favorisant l\'unité et l\'amour du prochain.'
  },
  {
    title: 'Entreprenariat',
    icon: <Briefcase />,
    desc: 'Promotion de l\'entrepreneuriat et du développement économique des communautés défavorisées.'
  },
  {
    title: 'Développement personnel',
    icon: <Activity />,
    desc: 'Ateliers et formations pour aider chacun à découvrir son potentiel, renforcer sa confiance et atteindre ses objectifs.'
  },
  {
    title: 'Education',
    icon: <BookOpen />,
    desc: 'Soutien scolaire, alphabétisation et accès aux ressources éducatives pour garantir un avenir meilleur aux enfants.'
  },
  {
    title: 'Santé',
    icon: <Stethoscope />,
    desc: 'Accès aux soins primaires, campagnes de vaccination et sensibilisation à l\'hygiène pour des communautés en bonne santé.'
  },
  {
    title: 'Assistance',
    icon: <HandHeart />,
    desc: 'Aide d\'urgence et soutien matériel aux personnes en situation de précarité ou victimes de catastrophes.'
  },
  {
    title: 'Coaching',
    icon: <MessageCircle />,
    desc: 'Mentorat individuel et de groupe pour accompagner les jeunes et les entrepreneurs dans leurs projets de vie.'
  },
];

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
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

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
                    className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl p-4 flex items-center gap-4"
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
                className="p-8 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 transition-all hover:shadow-lg dark:hover:shadow-blue-900/10"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
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

      {/* Partners Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white">Ils nous font confiance</h2>
        </div>

        <div className="overflow-hidden py-10 fade-mask">
          <div className="flex gap-12 whitespace-nowrap animate-marquee" style={{ animationDirection: 'reverse' }}>
            {[...partners, ...partners].map((p, i) => (
              <button
                key={`${p.name}-${i}`}
                onClick={() => setSelectedPartner(p)}
                className="w-40 h-40 rounded-full shadow-md hover:shadow-xl dark:shadow-none flex items-center justify-center hover:scale-110 transition-all shrink-0 border border-gray-100 dark:border-slate-800 relative overflow-hidden"
              >
                {p.logo && (
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    className="object-cover opacity-60 dark:opacity-40"
                  />
                )}
                <span className="font-bold text-gray-900 dark:text-gray-200 text-center p-2 text-sm whitespace-normal leading-tight relative z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-lg">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Modal */}
      {selectedPartner && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedPartner(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="
        bg-white dark:bg-slate-900
        w-full max-w-md
        max-h-[90vh]
        overflow-y-auto
        rounded-2xl
        p-6 sm:p-8
        relative
        shadow-2xl
        border border-gray-200 dark:border-slate-700
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
      "
          >
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 p-2 bg-gray-100 rounded-full dark:bg-slate-800 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center mt-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mb-6 overflow-hidden shadow-lg border-4 border-white dark:border-slate-700 relative">
                {selectedPartner.logo ? (
                  <Image
                    src={selectedPartner.logo}
                    alt={selectedPartner.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                    <span className="font-bold text-xl dark:text-white">
                      {selectedPartner.name.substring(0, 2)}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-2 dark:text-white">
                {selectedPartner.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {selectedPartner.description}
              </p>

              <a
                href={
                  selectedPartner.website && selectedPartner.website !== "#"
                    ? selectedPartner.website.startsWith("http")
                      ? selectedPartner.website
                      : `https://${selectedPartner.website}`
                    : "#"
                }
                target={
                  selectedPartner.website && selectedPartner.website !== "#"
                    ? "_blank"
                    : "_self"
                }
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!selectedPartner.website || selectedPartner.website === "#") {
                    e.preventDefault();
                    setSelectedPartner(null);
                  }
                }}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline bg-blue-50 px-4 py-2 rounded-lg dark:bg-blue-900/20 dark:text-blue-400 transition-colors"
              >
                {!selectedPartner.website || selectedPartner.website === "#"
                  ? "Pas de site web"
                  : "Visiter le site web"}

                {!selectedPartner.website || selectedPartner.website === "#" ? (
                  <X size={16} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
