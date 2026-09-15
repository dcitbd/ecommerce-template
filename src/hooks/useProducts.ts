import { useEffect, useState } from 'react';
import { ProductService } from '../services/productService';
import { Product } from '../types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, loading, refetch: () => ProductService.getAllProducts().then(setProducts) };
};
