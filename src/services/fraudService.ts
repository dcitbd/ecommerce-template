import { FraudFactory } from '../api/fraud/fraudFactory';
import { FraudCheckResult } from '../types/fraud';

export class FraudService {
  static async checkPhone(phoneNumber: string): Promise<FraudCheckResult> {
    return FraudFactory.checkCustomer(phoneNumber);
  }
}
