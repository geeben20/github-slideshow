import mongoose from 'mongoose';

const trendSchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true, unique: true },
    frequency: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Trend = mongoose.model('Trend', trendSchema);
