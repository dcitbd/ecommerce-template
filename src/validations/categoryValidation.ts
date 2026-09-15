export function validateCategory(name: string): string | null {
  if (!name || name.trim().length < 2) return 'ক্যাটাগরির নাম কমপক্ষে ২ অক্ষরের হতে হবে।';
  return null;
}
