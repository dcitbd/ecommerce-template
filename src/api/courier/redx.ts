import { CourierConsignmentPayload, CourierConsignmentResponse } from '../../types/courier';

export class RedxCourierApi {
  static async createOrder(payload: CourierConsignmentPayload): Promise<CourierConsignmentResponse> {
    return {
      success: true,
      consignmentId: 'REDX-' + Date.now(),
      trackingCode: 'RX' + Math.floor(100000 + Math.random() * 900000),
      message: 'RedX consignment queued'
    };
  }
}
