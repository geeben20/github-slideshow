import { BookmarksClient } from '../../components/BookmarksClient';

export default function BookmarksPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-brand">Saved content</p>
        <h1 className="mt-2 text-4xl font-semibold">Bookmarks</h1>
      </div>
      <BookmarksClient />
    </div>
  );
}
