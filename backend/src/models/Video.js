import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    youtubeId: { type: String, required: true, unique: true },
    thumbnail: String,
    category: { type: String, enum: ['crop-farming', 'livestock', 'agribusiness', 'agritech', 'general'], default: 'general' },
    publishedAt: Date,
    sourceChannel: String,
    tags: [String]
  },
  { timestamps: true }
);

export const Video = mongoose.model('Video', videoSchema);
