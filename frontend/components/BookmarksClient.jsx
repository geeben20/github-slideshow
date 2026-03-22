'use client';

import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { ArticleCard } from './ArticleCard';

export function BookmarksClient() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('Loading bookmarks...');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Sign in to view saved articles.');
      return;
    }
    api.getBookmarks(token)
      .then((data) => {
        setItems(data);
        setMessage(data.length ? '' : 'No bookmarks yet.');
      })
      .catch((err) => setMessage(err.message));
  }, []);

  if (message) return <div className="card">{message}</div>;

  return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{items.map((article) => <ArticleCard key={article._id} article={article} />)}</div>;
}
