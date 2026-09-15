import { CourierConsignmentPayload, CourierConsignmentResponse } from '../../types/courier';

export class SundarbanCourierApi {
  static async createOrder(payload: CourierConsignmentPayload): Promise<CourierConsignmentResponse> {
    return {
      success: true,
      consignmentId: 'SBN-' + Date.now(),
      trackingCode: 'SB' + Math.floor(100000 + Math.random() * 900000),
      message: 'Sundarban parcel CN generated'
    };
  }
}
