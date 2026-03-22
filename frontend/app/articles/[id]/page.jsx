import Link from 'next/link';
import { api } from '../../../lib/api';

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const article = await api.getArticle(id);

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <p className="text-sm uppercase tracking-[0.3em] text-brand">{article.category.replace('-', ' ')}</p>
      <h1 className="text-4xl font-semibold leading-tight">{article.title}</h1>
      <div className="flex flex-wrap gap-3 text-sm text-slate-500">
        <span>{article.sourceName}</span>
        <span>•</span>
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>
      <div className="card text-lg leading-8 text-slate-700 dark:text-slate-200">{article.summary}</div>
      <div className="flex gap-4">
        <a href={article.sourceUrl} target="_blank" rel="noreferrer" className="rounded-full bg-brand px-5 py-3 font-medium text-white">
          Visit original source
        </a>
        <Link href="/" className="rounded-full border border-slate-300 px-5 py-3 dark:border-slate-700">Back home</Link>
      </div>
      <p className="text-sm text-slate-500">This platform stores only metadata, summaries, and links to remain copyright-safe.</p>
    </article>
  );
}
