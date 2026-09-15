export function formatBanglaPhone(phone: string): string {
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length === 11) {
    return `${clean.slice(0, 5)}-${clean.slice(5)}`;
  }
  return phone;
}
