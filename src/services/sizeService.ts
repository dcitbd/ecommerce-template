import { ProductSize } from '../types/size';

const SIZES_KEY = 'twbd_sizes';

export class SizeService {
  static async getSizes(): Promise<ProductSize[]> {
    const raw = localStorage.getItem(SIZES_KEY);
    if (!raw) {
      const initial: ProductSize[] = [
        { id: 's1', name: 'Standard / Universal' },
        { id: 's2', name: '42mm' },
        { id: 's3', name: '44mm' },
        { id: 's4', name: '46mm' },
        { id: 's5', name: 'Mega Kit (Includes Accessories)' }
      ];
      localStorage.setItem(SIZES_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }
}
