import Link from 'next/link';
import Image from 'next/image';

export function ArticleCard({ article }) {
  return (
    <article className="card flex h-full flex-col gap-4">
      {article.imageUrl ? (
        <div className="relative h-48 overflow-hidden rounded-2xl">
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover" />
        </div>
      ) : null}
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand">
        <span>{article.category.replace('-', ' ')}</span>
        <span>•</span>
        <span>{article.sourceName}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold leading-tight">{article.title}</h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{article.summary}</p>
      </div>
      <div className="flex items-center justify-between text-sm">
        <Link href={`/articles/${article._id}`} className="font-medium text-brand">Read summary</Link>
        <a href={article.sourceUrl} target="_blank" rel="noreferrer" className="text-slate-500 underline underline-offset-4">
          Original source
        </a>
      </div>
    </article>
  );
}
