import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const method = req.method;

    // Defines which APIs are public
    const isPublicAdhesionPost = (path === '/api/adhesion' || path.startsWith('/api/adhesion/')) && method === 'POST';
    const isPublicPostsGet = (path === '/api/posts' || path.startsWith('/api/posts/')) && method === 'GET';
    const isPublicAuth = path === '/api/admin/auth';
    const isPublicChatbot = path === '/api/chatbot';

    // Allow public endpoints
    if (isPublicAdhesionPost || isPublicPostsGet || isPublicAuth || isPublicChatbot) {
        return NextResponse.next();
    }

    // Protect all other /api routes and the /admin page
    if (path.startsWith('/admin') || path.startsWith('/api/')) {
        const session = req.cookies.get('session')?.value;

        if (!session) {
            // For API calls, return 401
            if (path.startsWith('/api/')) {
                return NextResponse.json({ error: 'Accès non autorisé' }, { status: 401 });
            }
            // For the admin page, allowing it as the page itself handles login UI
            return NextResponse.next();
        }

        try {
            await decrypt(session);
            return NextResponse.next();
        } catch (err) {
            // If the session is invalid, clear it and return 401 or let it pass for the login page
            if (path.startsWith('/api/')) {
                return NextResponse.json({ error: 'Session expirée' }, { status: 401 });
            }
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
};
