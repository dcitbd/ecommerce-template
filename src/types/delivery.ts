export interface DeliveryCalculationRequest {
  deliveryMethod: 'Home Delivery' | 'Collect from Office' | 'From Collection Point';
  deliveryArea: 'Inside Dhaka' | 'Outside Dhaka';
  weightKg: number;
}

export interface DeliveryCalculationResult {
  baseCharge: number;
  weightExtra: number;
  totalDeliveryCharge: number;
  estimatedDays: string;
}
