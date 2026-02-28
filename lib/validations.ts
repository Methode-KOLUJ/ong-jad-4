import { z } from 'zod';

export const adhesionSchema = z.object({
    nom: z.string().min(2, 'Le nom est requis'),
    postNom: z.string().min(2, 'Le post-nom est requis'),
    prenom: z.string().min(2, 'Le prénom est requis'),
    email: z.string().email('Email invalide'),
    telephone: z.string().min(10, 'Numéro de téléphone invalide'),
    adresse: z.string().min(5, 'Adresse requise'),
    profession: z.string().min(2, 'Profession requise'),
    motivation: z.string().min(20, 'Veuillez expliquer votre motivation un peu plus en détail'),
    photoUrl: z.string().optional(), // Now optional as we handle upload separately usually or it's a string from upload
});

export type AdhesionFormData = z.infer<typeof adhesionSchema>;

export const donationSchema = z.object({
    amount: z.number().min(1, 'Le montant doit être positif'),
});

export type DonationFormData = z.infer<typeof donationSchema>;
