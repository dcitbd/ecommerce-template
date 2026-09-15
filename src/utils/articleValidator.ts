export function isArticleUnique(article: string, currentArticles: string[], currentId?: string): boolean {
  const normalized = article.trim().toUpperCase();
  return !currentArticles.some(a => a.toUpperCase() === normalized);
}
