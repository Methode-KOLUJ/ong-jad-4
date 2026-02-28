import { NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { password } = await req.json();

        // Check if environment variable is set
        if (!process.env.ADMIN_PASSWORD) {
            console.error('ADMIN_PASSWORD is not defined in environment variables.');
            return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
        }

        const success = await login(password);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
        }
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
