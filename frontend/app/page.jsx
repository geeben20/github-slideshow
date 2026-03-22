import { ArticleCard } from '../components/ArticleCard';
import { SearchBar } from '../components/SearchBar';
import { TrendList } from '../components/TrendList';
import { VideoCard } from '../components/VideoCard';
import { api } from '../lib/api';

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const data = await api.getDashboard({
    category: params.category || '',
    search: params.search || '',
    page: params.page || '1'
  });

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand to-brand-dark p-8 text-white shadow-soft">
          <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm">Live agriculture intelligence</p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
            Track agriculture news, agritech trends, market stories, and farming videos in one dashboard.
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            AgriPulse Hub aggregates agriculture-focused updates, summarizes each item, and sends readers to the original publisher.
          </p>
        </div>
        <TrendList trends={data.trends} />
      </section>

      <SearchBar />

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest agriculture news</h2>
          <p className="text-sm text-slate-500">{data.pagination.total} indexed summaries</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured videos</h2>
          <p className="text-sm text-slate-500">YouTube metadata only</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.videos.map((video) => (
            <VideoCard key={video.youtubeId} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
}
