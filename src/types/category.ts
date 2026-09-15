export interface Category {
  id: string;
  parentId?: string | null;
  name: string;
  slug: string;
  level: 1 | 2 | 3;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  children?: Category[];
}
