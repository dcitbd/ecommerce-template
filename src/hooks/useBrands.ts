import { useEffect, useState } from 'react';
import { BrandService } from '../services/brandService';
import { Brand } from '../types/brand';

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    BrandService.getBrands().then(setBrands);
  }, []);

  return { brands };
};
