import { Product } from './product';

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}
