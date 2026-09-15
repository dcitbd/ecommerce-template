import { OrderType } from '../types/product';

export function calculateEffectivePrice(
  product: { retailPrice: number; wholesalePrice?: number; preOrderPrice?: number },
  orderType: OrderType,
  quantity: number
): number {
  if (orderType === 'WholeSale' && product.wholesalePrice) {
    return product.wholesalePrice;
  }
  if (orderType === 'Pre-Order' && product.preOrderPrice) {
    return product.preOrderPrice;
  }
  return product.retailPrice;
}
