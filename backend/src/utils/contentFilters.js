const KEYWORDS = ['farming', 'agriculture', 'livestock', 'crops', 'agribusiness', 'agritech', 'farm', 'farmer'];
const NIGERIA_HINTS = ['nigeria', 'abuja', 'lagos', 'kaduna', 'kano', 'ibadan'];

export function isAgricultureRelated(text = '') {
  const value = text.toLowerCase();
  return KEYWORDS.some((keyword) => value.includes(keyword));
}

export function passesRegionFilter(text = '', nigeriaOnly = false) {
  if (!nigeriaOnly) return true;
  const value = text.toLowerCase();
  return NIGERIA_HINTS.some((keyword) => value.includes(keyword));
}

export function uniqueBy(items, selector) {
  const seen = new Set();
  return items.filter((item) => {
    const key = selector(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
