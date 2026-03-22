import test from 'node:test';
import assert from 'node:assert/strict';
import { categorizeContent, extractTrendKeywords, summarizeText } from '../utils/ai.js';

test('summarizeText returns compact summary', () => {
  const summary = summarizeText('Agriculture is changing. Farmers are using sensors. Yields are improving.');
  assert.match(summary, /Farmers are using sensors/);
});

test('categorizeContent maps agritech keywords', () => {
  assert.equal(categorizeContent({ title: 'AI drone platform for farms' }), 'agritech');
});

test('extractTrendKeywords counts keywords', () => {
  const trends = extractTrendKeywords([{ title: 'Maize market', summary: 'Maize prices rise' }]);
  assert.equal(trends[0].keyword, 'maize');
});
