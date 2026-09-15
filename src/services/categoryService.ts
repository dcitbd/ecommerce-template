import { Category } from '../types/category';

const CATEGORIES_KEY = 'twbd_categories';

export class CategoryService {
  static async getCategories(): Promise<Category[]> {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (!raw) {
      const initial: Category[] = [
        {
          id: 'cat_smartwatch',
          name: 'স্মার্টওয়াচ ও পরিধেয় গ্যাজেট',
          slug: 'smartwatches',
          level: 1,
          sortOrder: 1,
          isActive: true,
          children: [
            {
              id: 'cat_smartwatch_huawei',
              parentId: 'cat_smartwatch',
              name: 'Huawei Watch Series',
              slug: 'huawei-watches',
              level: 2,
              sortOrder: 1,
              isActive: true,
              children: [
                { id: 'cat_smartwatch_gt4', parentId: 'cat_smartwatch_huawei', name: 'GT 4 AMOLED Series', slug: 'huawei-gt4', level: 3, sortOrder: 1, isActive: true }
              ]
            },
            {
              id: 'cat_smartwatch_oneplus',
              parentId: 'cat_smartwatch',
              name: 'OnePlus & Amazfit Series',
              slug: 'oneplus-amazfit',
              level: 2,
              sortOrder: 2,
              isActive: true
            }
          ]
        },
        {
          id: 'cat_torch',
          name: 'টর্চলাইট ও রিচার্জেবল সার্চলাইট',
          slug: 'flashlights-torches',
          level: 1,
          sortOrder: 2,
          isActive: true,
          children: [
            { id: 'cat_torch_long', parentId: 'cat_torch', name: 'দূরপাল্লার জুম এলইডি (১০০০-২০০০মি.)', slug: 'long-range-torches', level: 2, sortOrder: 1, isActive: true },
            { id: 'cat_torch_tactical', parentId: 'cat_torch', name: 'ট্যাকটিক্যাল সার্চলাইট ও পাওয়ারব্যাংক', slug: 'tactical-spotlights', level: 2, sortOrder: 2, isActive: true }
          ]
        },
        {
          id: 'cat_audio',
          name: 'অডিও, হেডফোন ও ব্লুটুথ স্পিকার',
          slug: 'audio-speakers',
          level: 1,
          sortOrder: 3,
          isActive: true,
          children: [
            { id: 'cat_audio_mini', parentId: 'cat_audio', name: 'মিনি মাল্টিমিডিয়া ওয়্যারলেস স্পিকার', slug: 'mini-speakers', level: 2, sortOrder: 1, isActive: true }
          ]
        },
        {
          id: 'cat_dubai',
          name: 'দুবাই স্পেশাল প্রি-অর্ডার (সরাসরি আমদানি)',
          slug: 'dubai-preorders',
          level: 1,
          sortOrder: 4,
          isActive: true
        },
        {
          id: 'cat_office',
          name: 'অফিস ও ডেস্ক অর্গানাইজার সামগ্রী',
          slug: 'computer-office',
          level: 1,
          sortOrder: 5,
          isActive: true
        },
        {
          id: 'cat_accessories',
          name: 'মোবাইল ও হোম এক্সেসরিজ',
          slug: 'accessories',
          level: 1,
          sortOrder: 6,
          isActive: true
        }
      ];
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }

  static async saveCategory(category: Partial<Category>): Promise<Category> {
    const list = await this.getCategories();
    const newCat: Category = {
      id: category.id || 'cat_' + Date.now(),
      name: category.name || 'New Category',
      slug: (category.name || '').toLowerCase().replace(/\s+/g, '-'),
      level: category.level || 1,
      parentId: category.parentId || null,
      sortOrder: category.sortOrder || list.length + 1,
      isActive: category.isActive !== false
    };
    list.push(newCat);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list));
    return newCat;
  }
}
