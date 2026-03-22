const CATEGORY_RULES = {
  'crop-farming': ['crop', 'maize', 'wheat', 'rice', 'harvest', 'soil', 'fertilizer', 'seed'],
  livestock: ['livestock', 'dairy', 'cattle', 'poultry', 'goat', 'beef', 'animal'],
  agribusiness: ['agribusiness', 'commodity', 'market', 'export', 'finance', 'supply chain', 'investment'],
  agritech: ['agritech', 'drone', 'ai', 'technology', 'precision', 'robot', 'satellite']
};

export function summarizeText(text = '') {
  const cleaned = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleaned) return 'Agriculture-focused summary unavailable. Open the original source for the full story.';
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences.slice(0, 3).join(' ').slice(0, 360);
}

export function categorizeContent({ title = '', summary = '', tags = [] }) {
  const haystack = `${title} ${summary} ${tags.join(' ')}`.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_RULES)) {
    if (keywords.some((keyword) => haystack.includes(keyword))) return category;
  }
  return 'general';
}

export function extractTrendKeywords(items = []) {
  const stopWords = new Set(['the', 'and', 'for', 'with', 'from', 'into', 'amid', 'after', 'that', 'this']);
  const frequencies = new Map();
  for (const item of items) {
    const tokens = `${item.title || ''} ${item.summary || ''}`
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((token) => token.length > 3 && !stopWords.has(token));
    for (const token of tokens) frequencies.set(token, (frequencies.get(token) || 0) + 1);
  }
  return [...frequencies.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([keyword, frequency]) => ({ keyword, frequency }));
}
