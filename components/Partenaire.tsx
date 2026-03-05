'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

// Mock Data
export interface Partner {
    name: string;
    logo: string;
    description: string;
    website?: string;
}

const partners: Partner[] = [
    {
        name: 'Aqua Pischon',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733896/Aqua_sf4ryy.jpg',
        description: "",
        website: '#'
    },
    {
        name: 'Atlantic traiteur',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733896/Atlantic_p6jzpb.jpg',
        description: "Atlantic Traiteur est un service traiteur haut de gamme basé à Lubumbashi, spécialisé dans la création d’événements mémorables grâce à une cuisine raffinée et un accompagnement complet. Que ce soit pour des mariages, des événements professionnels ou des fêtes privées, l’équipe propose des menus personnalisés, des buffets élégants et une organisation sans stress, le tout avec des ingrédients frais et locaux, un service professionnel et une grande flexibilité pour s’adapter aux besoins et au budget de chaque client.",
        website: '#'
    },
    {
        name: 'Bora SARL',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733896/Bora_k86wjz.jpg',
        description: '',
        website: '#'
    },
    {
        name: 'Jésus-Christ au Centre',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733896/Christ_kql85b.jpg',
        description: "Ce cabinet de consultants bibliques intervient dans le monde entier, particulièrement en RDC, pour approfondir la compréhension des Écritures à travers l’enseignement de l’herméneutique. Sa mission est d’offrir une expérience textuelle approfondie au service de l’Évangile et du perfectionnement des croyants, en faisant de chacun un ami de la Bible et de la personne de Christ. Il organise des conférences, des ateliers, des chambres de réforme, des consultations et des formations, guidé par son credo : faire de la Bible une amie pour mieux l’interpréter et placer Jésus-Christ au centre pour devenir une extension de Sa personne.",
        website: '#'
    },
    {
        name: 'Travel Booking',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733895/Travel_dvcpqb.jpg',
        description: "Nous sommes une agence de voyage internationale qui accompagne ses clients dans l’obtention de visas partout dans le monde. Spécialisée dans la vente de billets d’avion nationaux et internationaux, ainsi que dans le fret et la vente de véhicules, elle assure aussi le suivi complet des dossiers, incluant le remplissage des formulaires et les réservations confirmées de vols et d’hôtels.",
        website: '#'
    },
    {
        name: 'Focus Empire',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733894/Empire_idqo0x.jpg',
        description: "Focus Empire se distingue par la création de clips vidéo, de spots publicitaires et la promotion de diverses formes d’art, tout en jouant un rôle clé dans l’industrie musicale grâce à la production, la promotion et le management d’artistes. L’agence offre également des services complets de publicité et marketing pour accroître la visibilité des produits et services, et met son expertise événementielle au service de l’organisation d’événements sur mesure. L’excellence y est une véritable promesse.",
        website: '#'
    },
    {
        name: 'Mission Evangélique de la Gloire',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733894/MEG_fqxj3v.jpg',
        description: "La Communauté Mission Évangélique la Gloire de la Deuxième Maison (MEG), située dans la Commune Annexe à Golf Plateau 4, œuvre pour le salut des âmes, la transformation spirituelle et sociale, le développement communautaire et le changement de mentalité. Guidée par les valeurs bibliques, elle accompagne chacun vers l’accomplissement de sa destinée en Christ et invite les fidèles à la retrouver à l’avenue Hon Mpanga n°70, près du Marché Kyungu.",
        website: '#'
    },
    {
        name: 'Maison Leader Construction',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772734973/MLS_atbrxw.jpg',
        description: "MLS SARL Construction est une entreprise active à Lubumbashi, Kolwezi, Kinshasa et Likasi, spécialisée dans la construction résidentielle et commerciale. Grâce à une équipe d’ingénieurs qualifiés, elle prend en charge chaque projet du début à la fin pour réaliser fidèlement la vision de ses clients, qu’il s’agisse d’une maison ou d’un bâtiment professionnel. Contact : +243 975 361 498 - +243 853 384 827 – maisonluabeyasolution@gmail.com",
        website: '#'
    },
    {
        name: 'Muzuri Realty',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733896/Muzuri_p0ritf.jpg',
        description: "Notre agence immobilière, implantée à Kinshasa et Lubumbashi, offre des services complets allant de la location de suites, appartements, bureaux et maisons à la vente de terrains, parcelles et concessions, ainsi qu’à la gestion professionnelle de biens. Dynamique et innovante, elle accompagne ses clients avec des solutions sur mesure pour soutenir leurs projets et favoriser leur épanouissement socio-économique, avec une vision tournée vers l’ensemble du continent africain.",
        website: '#'
    },
    {
        name: 'HDesign Creative',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733893/Creative_jws0f1.jpg',
        description: "Notre agence de création visuelle, active dans toute la RDC, accompagne les entreprises et professionnels dans la conception de logos, chartes graphiques et supports de communication (affiches, flyers, cartes de visite) afin de renforcer leur image de marque. L’équipe crée des visuels simples, percutants et adaptés aux besoins de chaque client pour favoriser une communication efficace et distinctive.",
        website: '#'
    },
    {
        name: 'The Horizon English Center',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733596/HEC_njgfqb.jpg',
        description: "",
        website: '#'
    },
    {
        name: 'Na Nguvu',
        logo: "https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733596/Nguvu_uy0nte.jpg",
        description: '',
        website: "#"
    },
    {
        name: 'SP corp',
        logo: 'https://res.cloudinary.com/dgv2vmgio/image/upload/v1772733596/SP_corp_lc5xgc.jpg',
        description: "",
        website: ""
    }
];

export default function Partenaire() {
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

    return (
        <>
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
                                        className="object-cover opacity-90 dark:opacity-70"
                                    />
                                )}
                                <span className="font-bold text-gray-900 dark:text-gray-200 text-center p-2 text-sm whitespace-normal leading-tight relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-lg">{p.name}</span>
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
        </>
    );
}

