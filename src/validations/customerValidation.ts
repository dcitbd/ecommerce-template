export function validateCustomer(data: any): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name) errors.name = 'নাম লিখুন';
  if (!data.phone) errors.phone = 'ফোন নম্বর লিখুন';
  return errors;
}
