import { Article } from '../models/Article.js';
import { Source } from '../models/Source.js';
import { Trend } from '../models/Trend.js';
import { Video } from '../models/Video.js';
import { fetchRssArticles } from './rssService.js';
import { fetchNewsApiArticles } from './newsApiService.js';
import { fetchYouTubeVideos } from './youtubeService.js';
import { extractTrendKeywords } from '../utils/ai.js';

export async function ingestAllContent() {
  const sources = await Source.find({ isActive: true }).lean();
  const [rssArticles, apiArticles, videos] = await Promise.all([
    fetchRssArticles(sources),
    fetchNewsApiArticles().catch((error) => {
      console.warn(error.message);
      return [];
    }),
    fetchYouTubeVideos().catch((error) => {
      console.warn(error.message);
      return [];
    })
  ]);

  const articles = [...rssArticles, ...apiArticles];

  for (const article of articles) {
    await Article.updateOne({ sourceUrl: article.sourceUrl }, { $set: article }, { upsert: true });
  }

  for (const video of videos) {
    await Video.updateOne({ youtubeId: video.youtubeId }, { $set: video }, { upsert: true });
  }

  const trends = extractTrendKeywords(articles);
  await Promise.all(
    trends.map((trend) =>
      Trend.updateOne(
        { keyword: trend.keyword },
        { $set: { ...trend, lastUpdated: new Date() } },
        { upsert: true }
      )
    )
  );

  return { articleCount: articles.length, videoCount: videos.length, trendCount: trends.length };
}
