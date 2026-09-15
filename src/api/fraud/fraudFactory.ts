import { CourierFraudService } from './courierFraud';
import { FraudScoreCalculator } from './fraudScore';
import { FraudCheckResult } from '../../types/fraud';

export class FraudFactory {
  static async checkCustomer(phone: string): Promise<FraudCheckResult> {
    const record = await CourierFraudService.lookupPhone(phone);
    return FraudScoreCalculator.calculate(phone, record);
  }
}
