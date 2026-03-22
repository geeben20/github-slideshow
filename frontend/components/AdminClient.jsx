'use client';

import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { StatsGrid } from './StatsGrid';

const emptyForm = { name: '', rssUrl: '', apiEndpoint: '', category: 'general', region: 'global' };

export function AdminClient() {
  const [token, setToken] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [sources, setSources] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;
    setToken(storedToken);
    Promise.all([api.getAnalytics(storedToken), api.getSources(storedToken)])
      .then(([analyticsData, sourceData]) => {
        setAnalytics(analyticsData);
        setSources(sourceData);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (!token) return <div className="card">Please sign in as an admin to access the dashboard.</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand">Admin dashboard</p>
          <h1 className="mt-2 text-4xl font-semibold">Moderation, sources, and analytics</h1>
        </div>
        <button
          onClick={async () => {
            const result = await api.runIngestion(token);
            alert(result.message);
          }}
          className="rounded-full bg-brand px-5 py-3 font-medium text-white"
        >
          Run ingestion now
        </button>
      </div>

      {analytics ? (
        <StatsGrid
          stats={[
            { label: 'Articles', value: analytics.metrics.articles },
            { label: 'Videos', value: analytics.metrics.videos },
            { label: 'Sources', value: analytics.metrics.sources },
            { label: 'Users', value: analytics.metrics.users }
          ]}
        />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="card">
          <h2 className="text-xl font-semibold">Manage sources</h2>
          <div className="mt-4 space-y-3">
            {sources.map((source) => (
              <div key={source._id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
                <div>
                  <p className="font-medium">{source.name}</p>
                  <p className="text-sm text-slate-500">{source.category} • {source.region}</p>
                </div>
                <button
                  onClick={async () => {
                    await api.deleteSource(token, source._id);
                    setSources((current) => current.filter((item) => item._id !== source._id));
                  }}
                  className="text-sm text-rose-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <form
          className="card space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            const created = await api.createSource(token, form);
            setSources((current) => [created, ...current]);
            setForm(emptyForm);
          }}
        >
          <h2 className="text-xl font-semibold">Add source</h2>
          {['name', 'rssUrl', 'apiEndpoint', 'region'].map((field) => (
            <input
              key={field}
              value={form[field]}
              onChange={(event) => setForm({ ...form, [field]: event.target.value })}
              placeholder={field}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            />
          ))}
          <select
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="general">General</option>
            <option value="crop-farming">Crop Farming</option>
            <option value="livestock">Livestock</option>
            <option value="agribusiness">Agribusiness</option>
            <option value="agritech">Agritech</option>
          </select>
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
          <button className="w-full rounded-2xl bg-brand px-5 py-3 font-medium text-white">Save source</button>
        </form>
      </div>
    </div>
  );
}
