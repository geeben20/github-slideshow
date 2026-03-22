import { Trend } from '../models/Trend.js';

export async function getTrends(req, res) {
  const items = await Trend.find().sort({ frequency: -1 }).limit(10);
  res.json(items);
}
