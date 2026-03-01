import { constructMetadata } from '@/lib/seo';
import AdhesionClient from '@/components/AdhesionClient';

export const metadata = constructMetadata({
  title: "ONG JAD - Devenir Membre",
  description: "Rejoignez notre communauté et contribuez activement au changement en devenant membre de l'Organisation Non Gouvernementale Jeunes Entrepreneurs en Action pour le Développement.",
});

export default function AdhesionPage() {
  return <AdhesionClient />;
}
