import mongoose from 'mongoose';

const sourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    rssUrl: String,
    apiEndpoint: String,
    category: { type: String, enum: ['crop-farming', 'livestock', 'agribusiness', 'agritech', 'general'], default: 'general' },
    region: { type: String, default: 'global' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Source = mongoose.model('Source', sourceSchema);
