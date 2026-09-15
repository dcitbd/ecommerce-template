import { calculateDeliveryCost } from '../utils/deliveryCalculator';
import { DeliveryCalculationResult } from '../types/delivery';

export class DeliveryService {
  static calculate(method: any, area: any, weightKg: number): DeliveryCalculationResult {
    const total = calculateDeliveryCost(method, area, weightKg);
    return {
      baseCharge: area === 'Inside Dhaka' ? 90 : 130,
      weightExtra: Math.max(0, total - (area === 'Inside Dhaka' ? 90 : 130)),
      totalDeliveryCharge: total,
      estimatedDays: method === 'Collect from Office' ? 'তাৎক্ষণিক সংগ্রহ' : area === 'Inside Dhaka' ? '২৪-৪৮ ঘণ্টা' : '২-৪ দিন'
    };
  }
}
