import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    title: string;
    slug: string;
    content: string;
    imageUrl: string;
    excerpt: string;
    tags: string[];
    readTime?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    excerpt: { type: String, required: true },
    tags: { type: [String], default: [] },
    readTime: { type: String },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
