import { CourierConsignmentPayload, CourierConsignmentResponse } from '../../types/courier';

export class PaperflyCourierApi {
  static async createOrder(payload: CourierConsignmentPayload): Promise<CourierConsignmentResponse> {
    return {
      success: true,
      consignmentId: 'PPF-' + Date.now(),
      trackingCode: 'PF' + Math.floor(100000 + Math.random() * 900000),
      message: 'Paperfly tracking generated'
    };
  }
}
