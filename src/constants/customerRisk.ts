export const RISK_LEVELS = {
  VERY_HIGH: { label: 'খুব ঝুঁকিপূর্ণ (Very High Risk)', min: 0, max: 49, color: 'bg-rose-500 text-white' },
  LOW_RISK: { label: 'স্বল্প ঝুঁকি (Low Risk)', min: 50, max: 59, color: 'bg-amber-500 text-white' },
  NO_RISK: { label: 'ঝুঁকিমুক্ত (No Risk)', min: 60, max: 69, color: 'bg-emerald-500 text-white' },
  VERIFIED: { label: 'ভেরিফাইড কাস্টমার (Verified)', min: 70, max: 79, color: 'bg-blue-600 text-white' },
  GOLD_VERIFIED: { label: 'গোল্ড ভেরিফাইড (Gold Verified)', min: 80, max: 100, color: 'bg-amber-400 text-slate-900 font-bold' },
};
