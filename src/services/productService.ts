import { Product } from '../types/product';
import { isArticleUnique } from '../utils/articleValidator';
import { createProductSlug } from '../utils/slugGenerator';
import { logActivity } from '../security/auditLogger';

const PRODUCTS_KEY = 'twbd_products_catalog';

export class ProductService {
  static getInitialProducts(): Product[] {
    return [
      {
        id: 'p1',
        articleSku: 'HWT-GT4-01',
        name: 'Huawei Watch GT 4 Pro Smartwatch (Dubai Edition)',
        slug: 'hwt-gt4-01-huawei-watch-gt-4-pro-smartwatch',
        categoryId: 'cat_smartwatch',
        categoryName: 'Smartwatches & Wearables',
        brandId: 'b_huawei',
        brandName: 'Huawei',
        condition: 'Brand New',
        orderTypes: ['Retail', 'Pre-Order', 'WholeSale'],
        mrpPrice: 28500,
        retailPrice: 24500,
        wholesalePrice: 21500,
        wholesaleMinQty: 10,
        preOrderPrice: 20900,
        stock: 35,
        weightKg: 0.450,
        images: ['/logo.svg', '/logo-light.svg'],
        coverImage: '/logo.svg',
        colors: ['Space Black', 'Silver Metallic'],
        sizes: ['46mm'],
        specifications: { 'Battery': 'Up to 14 Days', 'Waterproof': '5 ATM', 'Display': '1.43 AMOLED', 'Origin': 'Dubai Direct Import' },
        description: 'দুবাই থেকে সরাসরি আমদানিকৃত ১০০% অরিজিনাল হুয়াওয়ে ওয়াচ জিটি ৪। প্রিমিয়াম মেটাল ফিনিশ, সুপার অ্যামোলেড ডিসপ্লে এবং ২ সপ্তাহের ওয়ারেন্টি।',
        isActive: true,
        totalOrders: 142,
        totalViews: 1250,
        totalFavorites: 89,
        createdAt: '2026-02-01T00:00:00Z',
        updatedAt: '2026-08-20T00:00:00Z'
      },
      {
        id: 'p2',
        articleSku: 'OPW-02-BLK',
        name: 'OnePlus Watch 2 Dual-Engine Smartwatch',
        slug: 'opw-02-blk-oneplus-watch-2-dual-engine',
        categoryId: 'cat_smartwatch',
        categoryName: 'Smartwatches & Wearables',
        brandId: 'b_oneplus',
        brandName: 'OnePlus',
        condition: 'Brand New',
        orderTypes: ['Retail', 'Pre-Order', 'WholeSale'],
        mrpPrice: 34000,
        retailPrice: 29500,
        wholesalePrice: 26500,
        wholesaleMinQty: 10,
        preOrderPrice: 25500,
        stock: 18,
        weightKg: 0.500,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Space Black', 'Emerald Green'],
        sizes: ['Standard / Universal'],
        specifications: { 'Chipset': 'Snapdragon W5 + BES2700', 'Battery': '100 Hours Smart Mode', 'OS': 'Wear OS 4' },
        description: 'ডুয়েল চিপসেট আর্কিটেকচার সম্বলিত ফ্ল্যাগশিপ স্মার্টওয়াচ। হাই-স্পিড ওয়্যার ওএস ও আনলিমিটেড ব্যাটারি ব্যাকআপ।',
        isActive: true,
        totalOrders: 98,
        totalViews: 940,
        totalFavorites: 64,
        createdAt: '2026-02-15T00:00:00Z',
        updatedAt: '2026-08-22T00:00:00Z'
      },
      {
        id: 'p3',
        articleSku: 'AMZ-GTR4-SLV',
        name: 'Amazfit GTR 4 Smart Fitness Watch',
        slug: 'amz-gtr4-slv-amazfit-gtr-4-fitness-watch',
        categoryId: 'cat_smartwatch',
        categoryName: 'Smartwatches & Wearables',
        brandId: 'b_amazfit',
        brandName: 'Amazfit',
        condition: 'Brand New',
        orderTypes: ['Retail', 'WholeSale'],
        mrpPrice: 24500,
        retailPrice: 20500,
        wholesalePrice: 17800,
        wholesaleMinQty: 10,
        stock: 25,
        weightKg: 0.400,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Silver Metallic'],
        sizes: ['44mm'],
        specifications: { 'GPS': 'Dual-Band Circularly-Polarized', 'Battery': '14 Days', 'Sports Modes': '150+' },
        description: 'অ্যাথলেট ও স্পোর্টস লাভারদের জন্য সর্বাধুনিক ডুয়েল ব্যান্ড জিপিএস ট্র্যাকিং ওয়াচ।',
        isActive: true,
        totalOrders: 76,
        totalViews: 810,
        totalFavorites: 45,
        createdAt: '2026-03-01T00:00:00Z',
        updatedAt: '2026-08-25T00:00:00Z'
      },
      {
        id: 'p4',
        articleSku: 'HYL-RS4-PLUS',
        name: 'Haylou RS4 Plus Retina Display Smartwatch',
        slug: 'hyl-rs4-plus-haylou-rs4-plus-retina-smartwatch',
        categoryId: 'cat_smartwatch',
        categoryName: 'Smartwatches & Wearables',
        brandId: 'b_haylou',
        brandName: 'Haylou',
        condition: 'Brand New',
        orderTypes: ['Retail', 'WholeSale'],
        mrpPrice: 5800,
        retailPrice: 4600,
        wholesalePrice: 3850,
        wholesaleMinQty: 10,
        stock: 60,
        weightKg: 0.350,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Space Black', 'Gold Edition'],
        sizes: ['Standard / Universal'],
        specifications: { 'Screen': '1.78 AMOLED 60Hz', 'Strap': 'Magnetic', 'Sensors': 'SpO2, Heart Rate' },
        description: 'বাজেট সেগমেন্টের সেরা স্মুথ ৬০ হার্টজ ডিসপ্লে স্মার্টওয়াচ। ম্যাগনেটিক স্ট্র্যাপ যুক্ত।',
        isActive: true,
        totalOrders: 210,
        totalViews: 2400,
        totalFavorites: 130,
        createdAt: '2026-03-10T00:00:00Z',
        updatedAt: '2026-09-01T00:00:00Z'
      },
      {
        id: 'p5',
        articleSku: 'TW-TORCH-PRO-X9',
        name: 'Techno Ultra Long-Range Zoom Rechargeable LED Torch (1500m)',
        slug: 'tw-torch-pro-x9-ultra-long-range-zoom-rechargeable-led-torch',
        categoryId: 'cat_torch',
        categoryName: 'Flashlights & Torches',
        brandId: 'b_techno',
        brandName: 'Techno World Sourcing',
        condition: 'Brand New',
        orderTypes: ['Retail', 'Pre-Order', 'WholeSale'],
        mrpPrice: 3200,
        retailPrice: 2450,
        wholesalePrice: 1950,
        wholesaleMinQty: 10,
        preOrderPrice: 1850,
        stock: 85,
        weightKg: 0.850,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Space Black'],
        sizes: ['Mega Kit (Includes Accessories)'],
        specifications: { 'Range': '1500 Meters', 'Battery': '5000mAh Rechargeable', 'Body': 'Aviation Aluminum' },
        description: '১৫০০ মিটার সুপার দূরপাল্লার জুম রিচার্জেবল হাই-পাওয়ার এলইডি টর্চ লাইট। নাইট গার্ড ও প্রজেক্টের কাজে অত্যন্ত নির্ভরযোগ্য।',
        isActive: true,
        totalOrders: 310,
        totalViews: 3200,
        totalFavorites: 195,
        createdAt: '2026-02-10T00:00:00Z',
        updatedAt: '2026-09-02T00:00:00Z'
      },
      {
        id: 'p6',
        articleSku: 'TW-SPOT-50W',
        name: 'High-Power Tactical Spotlight Flashlight with PowerBank',
        slug: 'tw-spot-50w-high-power-tactical-spotlight-flashlight',
        categoryId: 'cat_torch',
        categoryName: 'Flashlights & Torches',
        brandId: 'b_techno',
        brandName: 'Techno World Sourcing',
        condition: 'Brand New',
        orderTypes: ['Retail', 'WholeSale'],
        mrpPrice: 4500,
        retailPrice: 3400,
        wholesalePrice: 2800,
        wholesaleMinQty: 10,
        stock: 40,
        weightKg: 1.200,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Space Black'],
        sizes: ['Standard / Universal'],
        specifications: { 'Power': '50W High Lumen', 'PowerBank Output': 'USB 5V/2A', 'Modes': '5 Modes with Strobe' },
        description: 'পাওয়ারব্যাংক ফিচার সমৃদ্ধ হেভি-ডিউটি স্পটলাইট ফ্ল্যাশলাইট।',
        isActive: true,
        totalOrders: 115,
        totalViews: 1420,
        totalFavorites: 77,
        createdAt: '2026-03-05T00:00:00Z',
        updatedAt: '2026-08-30T00:00:00Z'
      },
      {
        id: 'p7',
        articleSku: 'ANK-SPK-MINI',
        name: 'Anker Soundcore Mini 3 Bluetooth Multimedia Speaker',
        slug: 'ank-spk-mini-anker-soundcore-mini-3-speaker',
        categoryId: 'cat_audio',
        categoryName: 'Audio & Speakers',
        brandId: 'b_anker',
        brandName: 'Anker',
        condition: 'Brand New',
        orderTypes: ['Retail', 'Pre-Order', 'WholeSale'],
        mrpPrice: 4200,
        retailPrice: 3450,
        wholesalePrice: 2950,
        wholesaleMinQty: 10,
        preOrderPrice: 2850,
        stock: 30,
        weightKg: 0.400,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Space Black', 'Navy Blue'],
        sizes: ['Standard / Universal'],
        specifications: { 'Bass': 'BassUp Technology', 'Battery': '15 Hours Playtime', 'Waterproof': 'IPX7 Waterproof' },
        description: 'কমপ্যাক্ট বডিতে থম্পিং বেজ ও ক্রিস্টাল ক্লিয়ার সাউন্ডের প্রিমিয়াম মিনি স্পিকার।',
        isActive: true,
        totalOrders: 160,
        totalViews: 1850,
        totalFavorites: 92,
        createdAt: '2026-02-20T00:00:00Z',
        updatedAt: '2026-09-03T00:00:00Z'
      },
      {
        id: 'p8',
        articleSku: 'DB-SPEC-LAP-01',
        name: 'Dubai Pre-Order: High-End Custom OLED Laptop',
        slug: 'db-spec-lap-01-dubai-pre-order-custom-oled-laptop',
        categoryId: 'cat_dubai',
        categoryName: 'Dubai Pre-Order Specials',
        brandId: 'b_techno',
        brandName: 'Techno World Sourcing',
        condition: 'Brand New',
        orderTypes: ['Pre-Order'],
        mrpPrice: 165000,
        retailPrice: 148000,
        wholesalePrice: 140000,
        wholesaleMinQty: 5,
        preOrderPrice: 139000,
        stock: 0,
        weightKg: 2.200,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Space Black'],
        sizes: ['Standard / Universal'],
        specifications: { 'Source': 'Dubai Mall Direct', 'Lead Time': '10-15 Days', 'Warranty': '2 Weeks Replacement' },
        description: 'দুবাই থেকে ১০০% অগ্রিম পেমেন্টে সরাসরি বিশেষ আমদানি। আন্তর্জাতিক প্যাকেজিং ও ২ সপ্তাহ গ্যারান্টি।',
        isActive: true,
        totalOrders: 28,
        totalViews: 980,
        totalFavorites: 110,
        createdAt: '2026-04-01T00:00:00Z',
        updatedAt: '2026-09-05T00:00:00Z'
      },
      {
        id: 'p9',
        articleSku: 'OFF-FILE-HLD-01',
        name: 'Executive Single-File Document Desk Holder & Organizer',
        slug: 'off-file-hld-01-executive-single-file-document-desk-holder',
        categoryId: 'cat_office',
        categoryName: 'Computer & Office Peripherals',
        brandId: 'b_techno',
        brandName: 'Techno World Sourcing',
        condition: 'Brand New',
        orderTypes: ['Retail', 'WholeSale'],
        mrpPrice: 950,
        retailPrice: 750,
        wholesalePrice: 550,
        wholesaleMinQty: 20,
        stock: 120,
        weightKg: 0.600,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Space Black', 'Silver Metallic'],
        sizes: ['Standard / Universal'],
        specifications: { 'Material': 'Heavy Mesh Steel', 'Finish': 'Anti-Rust Coating' },
        description: 'অফিসের জরুরি ফাইল, ইনভয়েস ও ডকুমেন্ট সাজিয়ে রাখার জন্য প্রিমিয়াম স্টেইনলেস মেশ হোল্ডার।',
        isActive: true,
        totalOrders: 85,
        totalViews: 650,
        totalFavorites: 32,
        createdAt: '2026-03-12T00:00:00Z',
        updatedAt: '2026-08-18T00:00:00Z'
      },
      {
        id: 'p10',
        articleSku: 'OFF-MAG-RCK-02',
        name: 'Multi-Compartment Steel Magazine & Catalog Rack',
        slug: 'off-mag-rck-02-multi-compartment-steel-magazine-rack',
        categoryId: 'cat_office',
        categoryName: 'Computer & Office Peripherals',
        brandId: 'b_techno',
        brandName: 'Techno World Sourcing',
        condition: 'Brand New',
        orderTypes: ['Retail', 'WholeSale'],
        mrpPrice: 1850,
        retailPrice: 1450,
        wholesalePrice: 1150,
        wholesaleMinQty: 10,
        stock: 55,
        weightKg: 1.400,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Space Black'],
        sizes: ['Standard / Universal'],
        specifications: { 'Compartments': '4 Tier', 'Usage': 'Catalogs, Folders, Books' },
        description: 'দাপ্তরিক ক্যাটালগ ও ম্যাগাজিন ডিসপ্লের জন্য মজবুত ৪-স্তরের মেটাল স্ট্যান্ড।',
        isActive: true,
        totalOrders: 44,
        totalViews: 520,
        totalFavorites: 19,
        createdAt: '2026-03-20T00:00:00Z',
        updatedAt: '2026-08-28T00:00:00Z'
      },
      {
        id: 'p11',
        articleSku: 'ACC-MACA-PWDR',
        name: 'Organic Energy Supplement Powder (Dubai Direct)',
        slug: 'acc-maca-pwdr-organic-energy-supplement-powder',
        categoryId: 'cat_dubai',
        categoryName: 'Dubai Pre-Order Specials',
        brandId: 'b_techno',
        brandName: 'Techno World Sourcing',
        condition: 'Brand New',
        orderTypes: ['Retail', 'Pre-Order', 'WholeSale'],
        mrpPrice: 2800,
        retailPrice: 2250,
        wholesalePrice: 1850,
        wholesaleMinQty: 10,
        preOrderPrice: 1750,
        stock: 45,
        weightKg: 0.500,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Standard / Universal'],
        sizes: ['Standard / Universal'],
        specifications: { 'Source': 'Dubai Import', 'Origin': 'Original Packaged', 'Net Weight': '500g' },
        description: '১০০% পিওর ও প্রিমিয়াম গ্রেড অর্গানিক সাপ্লিমেন্ট। দুবাই থেকে আমদানিকৃত ফ্রেশ প্যাক।',
        isActive: true,
        totalOrders: 130,
        totalViews: 1120,
        totalFavorites: 68,
        createdAt: '2026-04-10T00:00:00Z',
        updatedAt: '2026-09-04T00:00:00Z'
      },
      {
        id: 'p12',
        articleSku: 'GAS-STV-ACC-01',
        name: 'Heavy Duty Infrared Energy Saving Gas Stove Burner Ring',
        slug: 'gas-stv-acc-01-infrared-energy-saving-burner-ring',
        categoryId: 'cat_accessories',
        categoryName: 'Mobile & Tablet Accessories',
        brandId: 'b_techno',
        brandName: 'Techno World Sourcing',
        condition: 'Brand New',
        orderTypes: ['Retail', 'WholeSale'],
        mrpPrice: 850,
        retailPrice: 650,
        wholesalePrice: 480,
        wholesaleMinQty: 20,
        stock: 90,
        weightKg: 0.400,
        images: ['/logo.svg'],
        coverImage: '/logo.svg',
        colors: ['Silver Metallic'],
        sizes: ['Universal Fit'],
        specifications: { 'Gas Savings': 'Up to 30%', 'Material': 'Cast Alloy' },
        description: 'রান্নায় গ্যাস সাশ্রয়কারী উইন্ডপ্রুফ ফ্লেম শিল্ড রিং। সব ধরনের গ্যাস্টোভে সহজে ব্যবহারযোগ্য।',
        isActive: true,
        totalOrders: 195,
        totalViews: 1600,
        totalFavorites: 84,
        createdAt: '2026-03-25T00:00:00Z',
        updatedAt: '2026-09-08T00:00:00Z'
      }
    ];
  }

  static async getAllProducts(): Promise<Product[]> {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      const initial = this.getInitialProducts();
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getAllProducts();
    return products.find(p => p.slug === slug || p.articleSku.toLowerCase() === slug.toLowerCase()) || null;
  }

  static async saveProduct(productData: Partial<Product>): Promise<{ success: boolean; product?: Product; error?: string }> {
    const products = await this.getAllProducts();

    // Unique article validation
    const sku = (productData.articleSku || '').trim().toUpperCase();
    if (!sku) return { success: false, error: 'আর্টিক্যাল SKU খালি রাখা যাবে না।' };

    const existingIndex = products.findIndex(p => p.id === productData.id);
    const otherArticles = products.filter(p => p.id !== productData.id).map(p => p.articleSku);

    if (!isArticleUnique(sku, otherArticles)) {
      return { success: false, error: `আর্টিক্যাল '${sku}' ইতোমধ্যে অন্য একটি প্রোডাক্টে ব্যবহৃত হয়েছে! অনন্য SKU দিন।` };
    }

    const slug = createProductSlug(sku, productData.name || 'product');

    if (existingIndex > -1) {
      products[existingIndex] = {
        ...products[existingIndex],
        ...productData,
        articleSku: sku,
        slug,
        updatedAt: new Date().toISOString()
      } as Product;
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      logActivity({ userName: 'Admin', role: 'admin', action: 'PRODUCT_UPDATE', entity: sku, details: `Updated product ${sku}` });
      return { success: true, product: products[existingIndex] };
    } else {
      const newProd: Product = {
        id: 'prod_' + Date.now(),
        articleSku: sku,
        name: productData.name || 'Untitled Product',
        slug,
        categoryId: productData.categoryId || 'cat_smartwatch',
        categoryName: productData.categoryName || 'General',
        brandId: productData.brandId || 'b_techno',
        brandName: productData.brandName || 'Techno World',
        condition: productData.condition || 'Brand New',
        orderTypes: productData.orderTypes || ['Retail'],
        mrpPrice: Number(productData.mrpPrice) || 1000,
        retailPrice: Number(productData.retailPrice) || 800,
        wholesalePrice: productData.wholesalePrice ? Number(productData.wholesalePrice) : undefined,
        wholesaleMinQty: productData.wholesaleMinQty || 10,
        preOrderPrice: productData.preOrderPrice ? Number(productData.preOrderPrice) : undefined,
        stock: Number(productData.stock) || 0,
        weightKg: Number(productData.weightKg) || 0.5,
        images: productData.images && productData.images.length ? productData.images : ['/logo.svg'],
        coverImage: productData.coverImage || '/logo.svg',
        colors: productData.colors || ['Black'],
        sizes: productData.sizes || ['Standard'],
        specifications: productData.specifications || {},
        description: productData.description || '',
        isActive: productData.isActive !== false,
        totalOrders: 0,
        totalViews: 0,
        totalFavorites: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      products.unshift(newProd);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      logActivity({ userName: 'Admin', role: 'admin', action: 'PRODUCT_CREATE', entity: sku, details: `Created product ${sku}` });
      return { success: true, product: newProd };
    }
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const products = await this.getAllProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
    logActivity({ userName: 'Admin', role: 'admin', action: 'PRODUCT_DELETE', entity: id, details: `Deleted product ${id}` });
    return true;
  }

  static async updateStockInline(id: string, newStock: number): Promise<boolean> {
    const products = await this.getAllProducts();
    const p = products.find(prod => prod.id === id);
    if (p) {
      p.stock = newStock;
      p.updatedAt = new Date().toISOString();
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      return true;
    }
    return false;
  }

  static async updatePriceInline(id: string, newPrice: number): Promise<boolean> {
    const products = await this.getAllProducts();
    const p = products.find(prod => prod.id === id);
    if (p) {
      p.retailPrice = newPrice;
      p.updatedAt = new Date().toISOString();
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      return true;
    }
    return false;
  }
}
