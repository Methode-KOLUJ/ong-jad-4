import { constructMetadata } from '@/lib/seo';
import MagazineUI from '@/components/MagazineUI';
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export const metadata = constructMetadata({
  title: "Actualités - ONG JAD",
  description: "Suivez toute l'actualité de l'Organisation Non Gouvernementale Jeunes Entrepreneurs en Action pour le Développement : articles, événements, et témoignages de nos actions sur le terrain.",
});

export const revalidate = 3600; // Cache for 1 hour

async function getPosts(query?: string) {
  await dbConnect();

  const filter = query
    ? {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    }
    : {};

  const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
}

export default async function ActualitesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = (await searchParams) || {};
  const posts = await getPosts(q);

  return <MagazineUI posts={posts} q={q} />;
}
