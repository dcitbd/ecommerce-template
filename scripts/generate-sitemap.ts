export function generateSitemapXml(productSlugs: string[]) {
  const urls = productSlugs.map(slug => `  <url>\n    <loc>https://technoworldbangladesh.com/product/${slug}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}
