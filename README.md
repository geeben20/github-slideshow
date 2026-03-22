# AgriPulse Hub

AgriPulse Hub is a production-ready agricultural news aggregation MVP built for startup-scale growth. It collects agriculture-focused stories from RSS feeds, API feeds, and YouTube, generates summaries, classifies content into categories, detects trending keywords, and presents everything in a responsive Next.js dashboard.

## Product capabilities

- Aggregates agriculture news, articles, and videos from multiple external sources.
- Filters for agriculture-only content using rule-based relevance checks.
- Stores metadata only: title, summary, preview image, tags, category, timestamps, and original source links.
- Supports JWT authentication with admin and user roles.
- Provides admin tooling for source management, moderation, analytics, and manual ingestion.
- Includes cron-based ingestion for automatic refresh every 15-30 minutes.
- Supports dark mode, mobile responsiveness, search, category filtering, and bookmarks.
- Includes optional Nigeria-focused filtering using environment configuration.

## Tech stack

### Frontend
- Next.js App Router
- React 19
- Tailwind CSS
- Server components for data-heavy pages and client components for auth/theme interactions

### Backend
- Node.js
- Express
- Mongoose / MongoDB
- JWT authentication
- node-cron scheduler
- rss-parser for feed ingestion
- News API / YouTube API integrations

## Folder structure

```text
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── cron
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── seeds
│   │   ├── services
│   │   ├── tests
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend
│   ├── app
│   ├── components
│   ├── hooks
│   ├── lib
│   ├── .env.example
│   └── package.json
└── package.json
```

## Database schema

### Users
- `name`
- `email`
- `password` (hashed)
- `role` (`admin` / `user`)
- `bookmarks`

### Articles
- `title`
- `summary`
- `sourceName`
- `sourceUrl`
- `category`
- `imageUrl`
- `publishedAt`
- `tags`
- `region`
- `moderationStatus`

### Videos
- `title`
- `youtubeId`
- `thumbnail`
- `category`
- `publishedAt`
- `sourceChannel`

### Sources
- `name`
- `rssUrl`
- `apiEndpoint`
- `category`
- `region`
- `isActive`

### Trends
- `keyword`
- `frequency`
- `lastUpdated`

## API overview

### Public endpoints
- `GET /api/health`
- `GET /api/articles`
- `GET /api/articles/:id`
- `GET /api/videos`
- `GET /api/trends`
- `POST /api/auth/register`
- `POST /api/auth/login`

### Authenticated endpoints
- `GET /api/auth/me`
- `GET /api/bookmarks`
- `POST /api/bookmarks/:articleId`

### Admin endpoints
- `GET /api/admin/analytics`
- `POST /api/admin/ingest`
- `GET /api/sources`
- `POST /api/sources`
- `DELETE /api/sources/:id`
- `PATCH /api/articles/:id/moderate`

## AI-style automation

The MVP uses deterministic content intelligence so it can run immediately without an LLM dependency.

- **Auto-summarization:** extracts and compresses incoming descriptions into 2-3 sentence previews.
- **Smart categorization:** maps keywords into Crop Farming, Livestock, Agribusiness, Agritech, or General.
- **Trending detection:** counts topic frequency across titles and summaries to surface the top keywords.

This approach keeps the platform deployable now, while leaving a clean upgrade path for external LLM summarizers later.

## Ingestion pipeline

1. Load active content sources from MongoDB.
2. Fetch RSS feed entries using `rss-parser`.
3. Fetch API news results using the configured news endpoint.
4. Fetch agriculture-focused YouTube videos using the YouTube Data API.
5. Filter items by agriculture relevance and optional Nigeria-only targeting.
6. Normalize and summarize metadata.
7. Upsert articles/videos into MongoDB.
8. Recompute trend keywords.
9. Trigger automatically via cron or manually from the admin panel.

## Environment variables

### Root
No root environment file is required.

### Backend (`backend/.env`)
```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/agri-news
JWT_SECRET=change_me
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
NEWS_API_URL=https://newsapi.org/v2/everything
NEWS_API_KEY=
YOUTUBE_API_KEY=
CRON_SCHEDULE=*/20 * * * *
ENABLE_CRON=true
NIGERIA_ONLY=false
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

## Local setup

1. Copy env templates.
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env.local`
2. Install dependencies.
   - `npm install`
3. Start MongoDB locally or configure a cloud MongoDB URI.
4. Optionally seed demo content.
   - `npm run seed`
5. Run both applications.
   - `npm run dev`
6. Open:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:4000/api/health`

## Deployment instructions

### Frontend on Vercel
1. Import the repository into Vercel.
2. Set the project root to `frontend/`.
3. Add environment variable:
   - `NEXT_PUBLIC_API_BASE_URL=https://your-render-api.onrender.com/api`
4. Deploy.

### Backend on Render
1. Create a new Web Service from this repository.
2. Set the root directory to `backend/`.
3. Build command:
   - `npm install`
4. Start command:
   - `npm start`
5. Add the backend environment variables from the template.
6. Attach a MongoDB Atlas database.
7. Optionally attach Redis later for caching and queue support.

## SEO, performance, and scaling notes

- Next.js app router enables SEO-friendly server-rendered pages.
- Remote images use Next Image for optimization and lazy loading.
- Article queries support pagination for infinite scroll migration later.
- The architecture cleanly supports Redis caching, background queues, and a vector/LLM layer.
- Since only summaries are stored, database growth is manageable and copyright-safe.

## Legal compliance checklist

- Do not store full article bodies.
- Always keep `sourceUrl` and link users to the publisher.
- Respect each source's robots.txt and feed/API terms before production rollout.
- Store metadata, thumbnails, and generated summaries only.

## Testing

### Backend checks
- Health endpoint test with Supertest
- Utility tests for summarization, categorization, and trend extraction

## Suggested next steps

- Add Redis caching and job queues with BullMQ.
- Add newsletter digests and web push notifications.
- Add market price dashboards and geo-personalization.
- Replace rule-based summarization with an LLM microservice when budget allows.
