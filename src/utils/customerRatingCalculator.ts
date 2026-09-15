import { RISK_LEVELS } from '../constants/customerRisk';

export function getCustomerRatingStatus(successRate: number): {
  badge: 'Very High Risk' | 'Low Risk' | 'No Risk' | 'Verified' | 'Gold Verified';
  color: string;
  label: string;
} {
  if (successRate < 50) {
    return { badge: 'Very High Risk', color: RISK_LEVELS.VERY_HIGH.color, label: RISK_LEVELS.VERY_HIGH.label };
  } else if (successRate < 60) {
    return { badge: 'Low Risk', color: RISK_LEVELS.LOW_RISK.color, label: RISK_LEVELS.LOW_RISK.label };
  } else if (successRate < 70) {
    return { badge: 'No Risk', color: RISK_LEVELS.NO_RISK.color, label: RISK_LEVELS.NO_RISK.label };
  } else if (successRate < 80) {
    return { badge: 'Verified', color: RISK_LEVELS.VERIFIED.color, label: RISK_LEVELS.VERIFIED.label };
  } else {
    return { badge: 'Gold Verified', color: RISK_LEVELS.GOLD_VERIFIED.color, label: RISK_LEVELS.GOLD_VERIFIED.label };
  }
}
