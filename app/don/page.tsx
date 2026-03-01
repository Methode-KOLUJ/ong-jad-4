import { constructMetadata } from '@/lib/seo';
import DonationClient from '@/components/DonationClient';

export const metadata = constructMetadata({
  title: "ONG JAD - Faire un don",
  description: "Soutenez les actions de l'Organisation Non Gouvernementale Jeunes Entrepreneurs en Action pour le Développement en faisant un don sécurisé. Votre générosité aide ceux qui en ont le plus besoin.",
  image: "/images/donate-og.jpg", // Assuming this image might be available or generic
});

export default function DonationPage() {
  return <DonationClient />;
}
