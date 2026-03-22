import { Video } from '../models/Video.js';

export async function getVideos(req, res) {
  const { category } = req.query;
  const query = category ? { category } : {};
  const items = await Video.find(query).sort({ publishedAt: -1 }).limit(20);
  res.json(items);
}
