const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
}

export const api = {
  getDashboard: async (params = {}) => {
    const search = new URLSearchParams(params).toString();
    const [articles, trends, videos] = await Promise.all([
      fetchJson(`/articles?${search}`),
      fetchJson('/trends'),
      fetchJson('/videos')
    ]);
    return { articles: articles.items, pagination: articles.pagination, trends, videos };
  },
  getArticles: (params = {}) => fetchJson(`/articles?${new URLSearchParams(params).toString()}`),
  getArticle: (id) => fetchJson(`/articles/${id}`),
  getVideos: () => fetchJson('/videos'),
  getTrends: () => fetchJson('/trends'),
  getSources: (token) => fetchJson('/sources', { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  login: (payload) => fetchJson('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => fetchJson('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  me: (token) => fetchJson('/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
  getAnalytics: (token) => fetchJson('/admin/analytics', { headers: { Authorization: `Bearer ${token}` } }),
  runIngestion: (token) => fetchJson('/admin/ingest', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }),
  createSource: (token, payload) => fetchJson('/sources', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) }),
  deleteSource: (token, id) => fetchJson(`/sources/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }),
  getBookmarks: (token) => fetchJson('/bookmarks', { headers: { Authorization: `Bearer ${token}` } }),
  toggleBookmark: (token, articleId) => fetchJson(`/bookmarks/${articleId}`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
};
