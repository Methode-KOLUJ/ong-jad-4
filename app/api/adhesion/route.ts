import { NextResponse } from 'next/server';
import { adhesionSchema } from '@/lib/validations';
import dbConnect from '@/lib/mongodb';
import Adhesion from '@/lib/models/Adhesion';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: Request) {
    try {
        // We expect JSON if client uploaded separately, or we could handle FormData. 
        // For this example, let's assume the client sends JSON data including a photoUrl 
        // OR we can demonstrate handling FormData if the client sends multipart.
        // The previous frontend code sent JSON. I will stick to JSON for consistency with previous steps,
        // assuming the frontend handles the file upload to a separate /api/upload endpoint or via Client-Side signed upload.
        // However, to be "Fullstack" and robust, let's look at the body.

        // If we want to handle file upload here, we need to parse FormData
        let data;
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            data = await req.json();
        } else {
            return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 400 });
        }

        const result = adhesionSchema.safeParse(data);

        if (!result.success) {
            return NextResponse.json({ error: result.error.flatten().fieldErrors }, { status: 400 });
        }

        await dbConnect();
        await Adhesion.create(result.data);

        return NextResponse.json({ success: true, message: 'Adhesion request received successfully' });
    } catch (error) {
        console.error('Adhesion error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET() {
    try {
        await dbConnect();
        const adhesions = await Adhesion.find({}).sort({ createdAt: -1 });
        return NextResponse.json(adhesions);
    } catch (error) {
        console.error('Fetch adhesions error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        await dbConnect();
        await Adhesion.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to delete adhesion' }, { status: 500 });
    }
}
