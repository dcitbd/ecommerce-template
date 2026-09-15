import { Product, OrderType } from './product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  orderType: OrderType;
  unitPrice: number;
  totalPrice: number;
}
