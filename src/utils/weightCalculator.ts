export function calculateCartTotalWeight(items: Array<{ product: { weightKg?: number }; quantity: number }>): number {
  return items.reduce((acc, item) => {
    const w = item.product.weightKg || 0.5;
    return acc + w * item.quantity;
  }, 0);
}
