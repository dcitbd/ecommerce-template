import { CourierFraudRecord } from './courierFraud';
import { FraudCheckResult } from '../../types/fraud';
import { getCustomerRatingStatus } from '../../utils/customerRatingCalculator';

export class FraudScoreCalculator {
  static calculate(phone: string, record: CourierFraudRecord): FraudCheckResult {
    const total = record.totalDelivered + record.totalCancelled + record.totalReturned;
    const successPercentage = total === 0 ? 100 : Math.round((record.totalDelivered / total) * 100);
    const ratingStatus = getCustomerRatingStatus(successPercentage);

    return {
      phoneNumber: phone,
      totalOrders: total,
      successOrders: record.totalDelivered,
      cancelOrders: record.totalCancelled,
      returnOrders: record.totalReturned,
      successPercentage,
      riskBadge: ratingStatus.badge,
      riskScore: 100 - successPercentage,
      courierHistory: [
        { courier: 'Steadfast', status: 'Delivered (4)', date: '2026-08-10' },
        { courier: 'Pathao', status: 'Delivered (3)', date: '2026-07-22' },
        { courier: 'RedX', status: record.totalCancelled > 0 ? 'Cancelled (1)' : 'Delivered (1)', date: '2026-06-15' }
      ],
      recommendation: successPercentage >= 70
        ? 'ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করা যাবে।'
        : 'অগ্রিম ডেলিভারি চার্জ অথবা আংশিক অগ্রিম পেমেন্ট নেওয়া আবশ্যক।'
    };
  }
}
