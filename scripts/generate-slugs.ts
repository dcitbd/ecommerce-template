export function generateSlug(article: string, name: string): string {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const cleanArticle = article.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${cleanArticle}-${cleanName}`;
}
