export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[^0-9]/g, '');
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(cleaned);
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
