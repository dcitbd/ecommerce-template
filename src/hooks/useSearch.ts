import { useState, useMemo } from 'react';
import { Product } from '../types/product';

export function useSearch(products: Product[]) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      p => p.name.toLowerCase().includes(q) ||
           p.articleSku.toLowerCase().includes(q) ||
           p.brandName?.toLowerCase().includes(q)
    );
  }, [products, query]);

  return { query, setQuery, results: filtered };
}
