import mongoose, { Schema, Document } from 'mongoose';

export interface IAdhesion extends Document {
    nom: string;
    postNom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    profession: string;
    motivation: string;
    photoUrl?: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}

const AdhesionSchema: Schema = new Schema({
    nom: { type: String, required: true },
    postNom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    adresse: { type: String, required: true },
    profession: { type: String, required: true },
    motivation: { type: String, required: true },
    photoUrl: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Adhesion || mongoose.model<IAdhesion>('Adhesion', AdhesionSchema);
