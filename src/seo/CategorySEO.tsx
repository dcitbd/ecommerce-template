import React from 'react';
import { SEO } from './SEO';

export const CategorySEO: React.FC<{ categoryName: string }> = ({ categoryName }) => {
  return (
    <SEO
      title={`${categoryName} কালেকশন | Techno World BD`}
      description={`Techno World BD তে সেরা দামে ${categoryName} এর বিপুল সমাহার। পাইকারি ও রিটেইল সারা দেশে ডেলিভারি।`}
    />
  );
};
