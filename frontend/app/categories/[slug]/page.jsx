import { ArticleCard } from '../../../components/ArticleCard';
import { api } from '../../../lib/api';

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const data = await api.getArticles({ category: slug });

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-brand">Category</p>
        <h1 className="mt-2 text-4xl font-semibold capitalize">{slug.replace('-', ' ')}</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.items.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}
