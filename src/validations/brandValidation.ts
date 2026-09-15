export function validateBrand(name: string): string | null {
  if (!name || name.trim().length < 2) return 'ব্রান্ডের নাম কমপক্ষে ২ অক্ষরের হতে হবে।';
  return null;
}
