export function validateArticleSku(sku: string, existingSkus: string[]): { valid: boolean; message?: string } {
  if (!sku || sku.trim().length === 0) {
    return { valid: false, message: 'প্রোডাক্টের আর্টিক্যাল / SKU দেওয়া বাধ্যতামূলক।' };
  }
  const clean = sku.trim().toUpperCase();
  if (existingSkus.some(s => s.toUpperCase() === clean)) {
    return { valid: false, message: 'এই আর্টিক্যাল / SKU টি আগেই ব্যবহৃত হয়েছে! ডুপ্লিকেট SKU দেওয়া যাবে না।' };
  }
  return { valid: true };
}

export function validateProductForm(form: any): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.name) errors.name = 'প্রোডাক্টের নাম লিখুন';
  if (!form.articleSku) errors.articleSku = 'আর্টিক্যাল কোড লিখুন';
  if (!form.mrpPrice || Number(form.mrpPrice) <= 0) errors.mrpPrice = 'সঠিক MRP দাম লিখুন';
  if (!form.retailPrice || Number(form.retailPrice) <= 0) errors.retailPrice = 'সঠিক রিটেইল দাম লিখুন';
  if (!form.categoryId) errors.categoryId = 'ক্যাটাগরি সিলেক্ট করুন';
  return errors;
}
