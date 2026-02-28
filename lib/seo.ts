import { Metadata } from 'next';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
}

export function constructMetadata({
    title = "ONG JAD - Jeunes Entrepreneurs en Action pour le Développement",
    description = "L'Organisation non Gouvernementale Jeunes Entrepreneurs en Action pour le Développement a pour but d'aider ceux qui en ont le plus besoin grâce à des actions concrètes et durables.",
    image = "/images/Logo.png",
    noIndex = false,
}: SEOProps = {}): Metadata {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.ongjad.org';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: baseUrl,
            siteName: "ONG JAD",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@ongjad",
        },
        metadataBase: new URL(baseUrl),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
