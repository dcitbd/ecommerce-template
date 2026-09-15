import { validatePhone } from './authValidation';

export function validateOrderForm(values: {
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  deliveryMethod: string;
  deliveryArea: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!values.customerName?.trim()) errors.customerName = 'কাস্টমারের নাম প্রদান করুন।';
  if (!validatePhone(values.customerPhone)) errors.customerPhone = 'সঠিক ১১ ডিজিটের বাংলাদেশী ফোন নম্বর দিন (যেমন: 01351003958)।';
  if (values.deliveryMethod !== 'Collect from Office' && !values.shippingAddress?.trim()) {
    errors.shippingAddress = 'বিস্তারিত ঠিকানা প্রদান করুন।';
  }
  return errors;
}
