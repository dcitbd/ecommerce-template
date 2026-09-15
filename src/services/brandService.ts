import { Brand } from '../types/brand';

const BRANDS_KEY = 'twbd_brands';

export class BrandService {
  static async getBrands(): Promise<Brand[]> {
    const raw = localStorage.getItem(BRANDS_KEY);
    if (!raw) {
      const initial: Brand[] = [
        { id: 'b_huawei', name: 'Huawei', slug: 'huawei', isActive: true },
        { id: 'b_oneplus', name: 'OnePlus', slug: 'oneplus', isActive: true },
        { id: 'b_amazfit', name: 'Amazfit', slug: 'amazfit', isActive: true },
        { id: 'b_haylou', name: 'Haylou', slug: 'haylou', isActive: true },
        { id: 'b_anker', name: 'Anker', slug: 'anker', isActive: true },
        { id: 'b_techno', name: 'Techno World Sourcing', slug: 'techno-world', isActive: true }
      ];
      localStorage.setItem(BRANDS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }

  static async saveBrand(name: string): Promise<Brand> {
    const list = await this.getBrands();
    const newBrand: Brand = {
      id: 'brand_' + Date.now(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      isActive: true
    };
    list.push(newBrand);
    localStorage.setItem(BRANDS_KEY, JSON.stringify(list));
    return newBrand;
  }
}
