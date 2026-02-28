import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // Simple logic or AI integration would go here
        const reply = "Je suis là pour vous aider. N'hésitez pas à parcourir notre site pour en savoir plus.";

        return NextResponse.json({ reply });
    } catch (error) {
        return NextResponse.json({ error: 'Chatbot error' }, { status: 500 });
    }
}
