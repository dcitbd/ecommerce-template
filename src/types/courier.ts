export interface CourierPartner {
  id: string;
  name: string;
  code: string;
  apiKey?: string;
  apiSecret?: string;
  webhookUrl?: string;
  isActive: boolean;
}

export interface CourierConsignmentPayload {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryArea: string;
  collectionAmount: number;
  weightKg: number;
  note?: string;
}

export interface CourierConsignmentResponse {
  success: boolean;
  consignmentId: string;
  trackingCode: string;
  message: string;
}
