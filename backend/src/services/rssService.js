import Parser from 'rss-parser';
import { summarizeText, categorizeContent } from '../utils/ai.js';
import { isAgricultureRelated, passesRegionFilter, uniqueBy } from '../utils/contentFilters.js';
import { env } from '../config/env.js';

const parser = new Parser();

export async function fetchRssArticles(sources) {
  const articles = [];
  for (const source of sources.filter((item) => item.rssUrl && item.isActive)) {
    try {
      const feed = await parser.parseURL(source.rssUrl);
      for (const item of feed.items || []) {
        const text = `${item.title || ''} ${item.contentSnippet || item.content || ''}`;
        if (!isAgricultureRelated(text) || !passesRegionFilter(text, env.nigeriaOnly)) continue;
        const summary = summarizeText(item.contentSnippet || item.content || item.title);
        articles.push({
          title: item.title,
          summary,
          sourceName: source.name,
          sourceUrl: item.link,
          category: categorizeContent({ title: item.title, summary }),
          imageUrl: item.enclosure?.url || item.thumbnail || '',
          publishedAt: item.isoDate || item.pubDate || new Date(),
          tags: [source.category, 'rss'].filter(Boolean),
          region: source.region
        });
      }
    } catch (error) {
      console.warn(`RSS fetch failed for ${source.name}: ${error.message}`);
    }
  }
  return uniqueBy(articles, (article) => article.sourceUrl);
}
