import { deliveryConfig } from '../config/deliveryConfig';

/**
 * Formula specified by user:
 * Inside Dhaka: 90 + weight calculation (1kg=90, 1.1kg=90+20, 2kg=90+20, 2.1kg=90+20+20)
 * Outside Dhaka: 130 + weight calculation (1kg=130, 1.1kg=130+20, 2kg=130+20, 2.1kg=130+20+20)
 * Office Pickup: 0 Tk
 */
export function calculateDeliveryCost(
  method: 'Home Delivery' | 'Collect from Office' | 'From Collection Point',
  area: 'Inside Dhaka' | 'Outside Dhaka',
  weightKg: number = 0.5
): number {
  if (method === 'Collect from Office') {
    return 0;
  }

  const base = area === 'Inside Dhaka' ? deliveryConfig.insideDhakaBase : deliveryConfig.outsideDhakaBase;
  const extraPerKg = deliveryConfig.extraPerKg;

  const w = Math.max(weightKg, 0.1);
  if (w <= 1.0) {
    return base;
  }

  const extraKg = Math.ceil(w - 1.0);
  return base + extraKg * extraPerKg;
}
