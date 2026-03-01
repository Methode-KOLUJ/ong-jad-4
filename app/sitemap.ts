import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.ongjad.com';

    // Get dynamic posts
    await dbConnect();
    const posts = await Post.find({}).select('slug updatedAt').lean();

    const postEntries: MetadataRoute.Sitemap = posts.map((post: any) => ({
        url: `${baseUrl}/actualites/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/actualites`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/adhesion`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/don`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        ...postEntries,
    ];
}
