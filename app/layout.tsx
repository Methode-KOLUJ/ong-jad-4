import type { Metadata } from 'next';
import { Outfit, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import LayoutWrapper from '@/components/LayoutWrapper';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.ongjad.org';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'ONG JAD - Jeunes Entrepreneurs en Action pour le Développement',
    template: '%s | ONG JAD'
  },
  description: "L'Organisation Non Gouvernementale Jeunes Entrepreneurs en Action pour le Développement a pour but d'aider ceux qui en ont le plus besoin grâce à des actions concrètes et durables et de promouvoir l'entrepreneuriat.",
  keywords: ['ONG', 'JAD', 'Développement', 'Entrepreneuriat', 'Congo', 'RDC', 'Action Sociale', 'Solidarité', 'Jeunesse'],
  authors: [{ name: 'ONG JAD' }],
  creator: 'ONG JAD',
  publisher: 'ONG JAD',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'ONG JAD - Jeunes Entrepreneurs',
    description: "Rejoignez-nous pour promouvoir l'entrepreneuriat par l'action sur le terrain.",
    url: baseUrl,
    siteName: 'ONG JAD',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/Logo.png', // Default OG Banner
        width: 1200,
        height: 630,
        alt: 'ONG JAD Actions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ONG JAD',
    description: 'Promouvoir l\'entrepreneuriat par l\'action concrète.',
    images: ['/images/Logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
