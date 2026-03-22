'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <form
      className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-soft dark:bg-slate-900 md:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const query = new URLSearchParams(params.toString());
        query.set('search', form.get('search'));
        query.set('category', form.get('category'));
        router.push(`/?${query.toString()}`);
      }}
    >
      <input
        name="search"
        placeholder="Search agriculture topics, crops, markets..."
        defaultValue={params.get('search') || ''}
        className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand dark:border-slate-700 dark:bg-slate-950"
      />
      <select
        name="category"
        defaultValue={params.get('category') || ''}
        className="rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
      >
        <option value="">All categories</option>
        <option value="crop-farming">Crop Farming</option>
        <option value="livestock">Livestock</option>
        <option value="agribusiness">Agribusiness</option>
        <option value="agritech">Agritech</option>
      </select>
      <button className="rounded-2xl bg-brand px-5 py-3 font-medium text-white">Filter</button>
    </form>
  );
}
