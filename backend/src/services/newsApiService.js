import { summarizeText, categorizeContent } from '../utils/ai.js';
import { env } from '../config/env.js';
import { uniqueBy, passesRegionFilter } from '../utils/contentFilters.js';

const query = encodeURIComponent('farming OR agriculture OR livestock OR crops OR agribusiness');

export async function fetchNewsApiArticles() {
  if (!env.newsApiKey) return [];
  const url = `${env.newsApiUrl}?q=${query}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${env.newsApiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`News API request failed with ${response.status}`);
  const data = await response.json();
  const normalized = (data.articles || [])
    .filter((item) => item.title && item.url)
    .filter((item) => passesRegionFilter(`${item.title} ${item.description || ''}`, env.nigeriaOnly))
    .map((item) => {
      const summary = summarizeText(item.description || item.content || item.title);
      return {
        title: item.title,
        summary,
        sourceName: item.source?.name || 'News API',
        sourceUrl: item.url,
        category: categorizeContent({ title: item.title, summary }),
        imageUrl: item.urlToImage || '',
        publishedAt: item.publishedAt || new Date(),
        tags: ['api']
      };
    });
  return uniqueBy(normalized, (article) => article.sourceUrl);
}
