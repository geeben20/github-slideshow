import { env } from '../config/env.js';
import { categorizeContent } from '../utils/ai.js';

export async function fetchYouTubeVideos() {
  if (!env.youtubeApiKey) return [];
  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: '12',
    q: 'agriculture farming livestock agribusiness',
    type: 'video',
    order: 'date',
    key: env.youtubeApiKey
  });
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
  if (!response.ok) throw new Error(`YouTube API request failed with ${response.status}`);
  const data = await response.json();
  return (data.items || []).map((item) => ({
    title: item.snippet.title,
    youtubeId: item.id.videoId,
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
    category: categorizeContent({ title: item.snippet.title, summary: item.snippet.description }),
    publishedAt: item.snippet.publishedAt,
    sourceChannel: item.snippet.channelTitle,
    tags: ['youtube']
  }));
}
