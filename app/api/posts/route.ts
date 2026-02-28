import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export async function GET() {
    try {
        await dbConnect();
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return NextResponse.json(posts);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();

        let slug = body.slug;
        if (!slug && body.title) {
            slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        // Ensure uniqueness
        let uniqueSlug = slug;
        let counter = 1;
        while (await Post.findOne({ slug: uniqueSlug })) {
            uniqueSlug = `${slug}-${counter}`;
            counter++;
        }

        body.slug = uniqueSlug;

        const newPost = await Post.create(body);

        // Purge cache for news catalog
        revalidatePath('/actualites');
        revalidatePath('/'); // in case we have news on home page

        return NextResponse.json({ success: true, post: newPost });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
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
        const postToDelete = await Post.findById(id);
        if (postToDelete) {
            await Post.findByIdAndDelete(id);
            // Purge cache
            revalidatePath('/actualites');
            revalidatePath(`/actualites/${postToDelete.slug}`);
            revalidatePath('/');
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { _id, ...updateData } = body;

        if (!_id) {
            return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
        }

        await dbConnect();

        // If title is updated and we want to update slug, or just ensure no collision
        if (updateData.slug) {
            let uniqueSlug = updateData.slug;
            let counter = 1;
            // Check for other posts with the same slug
            while (await Post.findOne({ slug: uniqueSlug, _id: { $ne: _id } })) {
                uniqueSlug = `${updateData.slug}-${counter}`;
                counter++;
            }
            updateData.slug = uniqueSlug;
        } else if (updateData.title) {
            let baseSlug = updateData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            let uniqueSlug = baseSlug;
            let counter = 1;
            while (await Post.findOne({ slug: uniqueSlug, _id: { $ne: _id } })) {
                uniqueSlug = `${baseSlug}-${counter}`;
                counter++;
            }
            updateData.slug = uniqueSlug;
        }

        const updatedPost = await Post.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedPost) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Purge cache
        revalidatePath('/actualites');
        revalidatePath(`/actualites/${updatedPost.slug}`);
        revalidatePath('/');

        return NextResponse.json({ success: true, post: updatedPost });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}
