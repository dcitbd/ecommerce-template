export function validateAdminUser(user: any): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!user.name) errors.name = 'ব্যবহারকারীর নাম লিখুন';
  if (!user.phone) errors.phone = 'ফোন নম্বর লিখুন';
  if (!user.roleId) errors.roleId = 'রোল সিলেক্ট করুন';
  return errors;
}
