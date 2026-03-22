import { Article } from '../models/Article.js';
import { Source } from '../models/Source.js';
import { Trend } from '../models/Trend.js';
import { User } from '../models/User.js';
import { Video } from '../models/Video.js';
import { ingestAllContent } from '../services/ingestionService.js';

export async function getAnalytics(req, res) {
  const [articles, videos, sources, users, hiddenArticles, trends] = await Promise.all([
    Article.countDocuments(),
    Video.countDocuments(),
    Source.countDocuments(),
    User.countDocuments(),
    Article.countDocuments({ moderationStatus: 'hidden' }),
    Trend.find().sort({ frequency: -1 }).limit(5)
  ]);
  res.json({ metrics: { articles, videos, sources, users, hiddenArticles }, trends });
}

export async function runIngestion(req, res) {
  const result = await ingestAllContent();
  res.json({ message: 'Ingestion completed', result });
}
