'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Force immediate scroll to top on every navigation
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' as ScrollBehavior, // Use instant to avoid smooth scroll conflict on page change
        });
    }, [pathname]);

    return null;
}
