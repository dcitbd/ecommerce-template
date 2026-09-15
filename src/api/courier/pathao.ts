import { CourierConsignmentPayload, CourierConsignmentResponse } from '../../types/courier';

export class PathaoCourierApi {
  static async createOrder(payload: CourierConsignmentPayload): Promise<CourierConsignmentResponse> {
    console.log('[Pathao API] Sending consignment:', payload);
    return {
      success: true,
      consignmentId: 'PATHAO-' + Date.now(),
      trackingCode: 'PT' + Math.floor(100000 + Math.random() * 900000),
      message: 'Pathao parcel created successfully'
    };
  }
}
