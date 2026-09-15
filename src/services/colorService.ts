import { ProductColor } from '../types/color';

const COLORS_KEY = 'twbd_colors';

export class ColorService {
  static async getColors(): Promise<ProductColor[]> {
    const raw = localStorage.getItem(COLORS_KEY);
    if (!raw) {
      const initial: ProductColor[] = [
        { id: 'c1', name: 'Space Black', hexCode: '#0f172a' },
        { id: 'c2', name: 'Silver Metallic', hexCode: '#e2e8f0' },
        { id: 'c3', name: 'Emerald Green', hexCode: '#10b981' },
        { id: 'c4', name: 'Navy Blue', hexCode: '#1e3a8a' },
        { id: 'c5', name: 'Gold Edition', hexCode: '#d97706' }
      ];
      localStorage.setItem(COLORS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }
}
