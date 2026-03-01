import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'ONG JAD - Jeunes Entrepreneurs en Action pour le Développement',
        short_name: 'ONG JAD',
        description: "Promouvoir l'entrepreneuriat par l'action concrète sur le terrain.",
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563eb', // Blue-600 color equivalent from your theme
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
