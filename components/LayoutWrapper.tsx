'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith('/admin');
    const isActualitesPath = pathname?.startsWith('/actualites');

    return (
        <>
            {!isAdminPath && <Navbar />}
            <main className={`min-h-screen ${!isAdminPath ? 'pt-16' : ''}`}>
                {children}
            </main>
            {!isAdminPath && !isActualitesPath && <Footer />}
            {!isAdminPath && !isActualitesPath && <Chatbot />}
        </>
    );
}
