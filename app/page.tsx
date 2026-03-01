import { constructMetadata } from '@/lib/seo';
import HomeClient from '@/components/HomeClient';

export const metadata = constructMetadata({
  title: "ONG JAD - Accueil",
  description: "Bienvenue sur le site officiel de l'ONG JAD. Ensemble pour un avenir meilleur.",
});

export default function Home() {
  return <HomeClient />;
}
