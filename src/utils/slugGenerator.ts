export function createProductSlug(article: string, name: string): string {
  const cleanArticle = (article || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const cleanName = (name || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-');
  return `${cleanArticle}-${cleanName}`;
}
