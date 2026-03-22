import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true },
    sourceName: { type: String, required: true },
    sourceUrl: { type: String, required: true, unique: true },
    category: { type: String, enum: ['crop-farming', 'livestock', 'agribusiness', 'agritech', 'general'], default: 'general' },
    imageUrl: String,
    publishedAt: { type: Date, index: true },
    tags: [{ type: String, index: true }],
    region: { type: String, default: 'global' },
    isFeatured: { type: Boolean, default: false },
    moderationStatus: { type: String, enum: ['published', 'hidden'], default: 'published' }
  },
  { timestamps: true }
);

articleSchema.index({ title: 'text', summary: 'text', tags: 'text' });

export const Article = mongoose.model('Article', articleSchema);
