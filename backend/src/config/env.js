import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agri-news',
  jwtSecret: process.env.JWT_SECRET || 'change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  newsApiUrl: process.env.NEWS_API_URL || 'https://newsapi.org/v2/everything',
  newsApiKey: process.env.NEWS_API_KEY || '',
  youtubeApiKey: process.env.YOUTUBE_API_KEY || '',
  cronSchedule: process.env.CRON_SCHEDULE || '*/20 * * * *',
  enableCron: process.env.ENABLE_CRON !== 'false',
  nigeriaOnly: process.env.NIGERIA_ONLY === 'true'
};
