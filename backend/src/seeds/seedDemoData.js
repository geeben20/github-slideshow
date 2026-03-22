import { connectDb } from '../config/db.js';
import { Article } from '../models/Article.js';
import { Source } from '../models/Source.js';
import { Trend } from '../models/Trend.js';
import { User } from '../models/User.js';
import { Video } from '../models/Video.js';

async function seed() {
  await connectDb();
  await Promise.all([Article.deleteMany({}), Video.deleteMany({}), Trend.deleteMany({}), Source.deleteMany({}), User.deleteMany({})]);

  await Source.insertMany([
    { name: 'FAO Newsroom', rssUrl: 'https://www.fao.org/news/rss/en/', category: 'general', region: 'global' },
    { name: 'AgriBusiness Global', rssUrl: 'https://www.agribusinessglobal.com/feed/', category: 'agribusiness', region: 'global' },
    { name: 'Nigeria Agriculture', rssUrl: 'https://guardian.ng/category/features/agro-care/feed/', category: 'crop-farming', region: 'nigeria' }
  ]);

  await Article.insertMany([
    {
      title: 'Precision irrigation helps maize farmers reduce water usage',
      summary: 'Growers are adopting sensor-led irrigation systems to stabilize yields while cutting water waste. The shift is accelerating across commercial farming operations.',
      sourceName: 'Demo Feed',
      sourceUrl: 'https://example.com/articles/precision-irrigation',
      category: 'agritech',
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854',
      publishedAt: new Date(),
      tags: ['irrigation', 'maize', 'technology'],
      isFeatured: true
    },
    {
      title: 'Livestock producers explore climate-smart feed alternatives',
      summary: 'Feed innovation and better herd data are helping livestock producers manage costs and emissions. Regional cooperatives are piloting new supply models.',
      sourceName: 'Demo Feed',
      sourceUrl: 'https://example.com/articles/climate-smart-feed',
      category: 'livestock',
      imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a',
      publishedAt: new Date(),
      tags: ['livestock', 'feed']
    }
  ]);

  await Video.create({
    title: 'How agritech startups are modernizing smallholder farms',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    category: 'agritech',
    publishedAt: new Date(),
    sourceChannel: 'Agri Demo'
  });

  await Trend.insertMany([
    { keyword: 'irrigation', frequency: 9 },
    { keyword: 'livestock', frequency: 6 },
    { keyword: 'maize', frequency: 5 }
  ]);

  await User.create({ name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' });
  console.log('Demo data seeded');
  process.exit(0);
}

seed();
