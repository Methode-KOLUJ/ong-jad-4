import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
    nom: string;
    email: string;
    amount: number;
    message?: string;
    status: 'pending' | 'completed' | 'failed';
    paymentReference?: string;
    createdAt: Date;
}

const DonationSchema: Schema = new Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentReference: { type: String },
}, { timestamps: true });

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
