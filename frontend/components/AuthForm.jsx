'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '../lib/api';

export function AuthForm({ mode = 'login' }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="card mx-auto max-w-md space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
          const form = new FormData(event.currentTarget);
          const payload = Object.fromEntries(form.entries());
          const response = mode === 'login' ? await api.login(payload) : await api.register(payload);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          router.push(mode === 'login' ? '/admin' : '/');
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }}
    >
      <h1 className="text-3xl font-semibold">{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
      {mode === 'register' ? <input name="name" placeholder="Full name" className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" required /> : null}
      <input name="email" type="email" placeholder="Email" className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" required />
      <input name="password" type="password" placeholder="Password" className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" required />
      {error ? <p className="text-sm text-rose-500">{error}</p> : null}
      <button disabled={loading} className="w-full rounded-2xl bg-brand px-5 py-3 font-medium text-white disabled:opacity-60">
        {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
      </button>
    </form>
  );
}
