import { Article } from '../models/Article.js';

export async function getArticles(req, res) {
  const { category, search, page = 1, limit = 12 } = req.query;
  const query = { moderationStatus: 'published' };
  if (category) query.category = category;
  if (search) query.$text = { $search: search };
  const items = await Article.find(query)
    .sort({ publishedAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));
  const total = await Article.countDocuments(query);
  res.json({ items, pagination: { page: Number(page), limit: Number(limit), total } });
}

export async function getArticleById(req, res) {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
}

export async function toggleModeration(req, res) {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });
  article.moderationStatus = article.moderationStatus === 'published' ? 'hidden' : 'published';
  await article.save();
  res.json(article);
}
