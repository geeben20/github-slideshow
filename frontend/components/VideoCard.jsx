import Image from 'next/image';

export function VideoCard({ video }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noreferrer"
      className="card block"
    >
      <div className="relative mb-4 h-44 overflow-hidden rounded-2xl">
        <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
      </div>
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand">{video.category.replace('-', ' ')}</p>
      <h3 className="text-lg font-semibold">{video.title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{video.sourceChannel}</p>
    </a>
  );
}
