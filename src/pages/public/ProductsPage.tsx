import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useBrands } from '../../hooks/useBrands';
import { ProductCard } from '../../components/product/ProductCard';
import { Pagination } from '../../components/common/Pagination';
import { SEO } from '../../seo/SEO';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();

  const activeCategory = searchParams.get('category') || '';
  const activeBrand = searchParams.get('brand') || '';
  const activeOrderType = searchParams.get('orderType') || '';
  const [priceMax, setPriceMax] = useState<number>(150000);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = !activeCategory || p.categoryId === activeCategory;
      const matchBrand = !activeBrand || p.brandId === activeBrand;
      const matchOrderType = !activeOrderType || p.orderTypes.includes(activeOrderType as any);
      const matchPrice = p.retailPrice <= priceMax;
      return matchCat && matchBrand && matchOrderType && matchPrice;
    });
  }, [products, activeCategory, activeBrand, activeOrderType, priceMax]);

  // Pagination (< 1, 2, 3 ... 14 >)
  const itemsPerPage = 30; // 4-grid, 30 products requirement
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO title="সকল প্রোডাক্টস ক্যাটালগ | Techno World BD" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center">
              <Filter className="w-4 h-4 mr-1.5 text-emerald-600" /> ফিল্টার সমূহ
            </h3>
            {(activeCategory || activeBrand || activeOrderType) && (
              <button
                onClick={() => setSearchParams({})}
                className="text-[11px] text-rose-500 font-bold hover:underline"
              >
                রিসেট
              </button>
            )}
          </div>

          {/* Category Tree Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">ক্যাটাগরি</h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => {
                  searchParams.delete('category');
                  setSearchParams(searchParams);
                }}
                className={`w-full text-left px-2 py-1.5 rounded-lg font-medium transition ${
                  !activeCategory ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                সকল ক্যাটাগরি
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    searchParams.set('category', c.id);
                    setSearchParams(searchParams);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg font-medium transition ${
                    activeCategory === c.id ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Order Type Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">অর্ডার টাইপ</h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'Retail', label: 'ইন-স্টক রিটেইল' },
                { id: 'Pre-Order', label: 'দুবাই প্রি-অর্ডার' },
                { id: 'WholeSale', label: 'হোলসেল / পাইকারি' }
              ].map((t) => (
                <label key={t.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="order_type_filter"
                    checked={activeOrderType === t.id}
                    onChange={() => {
                      searchParams.set('orderType', t.id);
                      setSearchParams(searchParams);
                    }}
                    className="text-emerald-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">ব্র্যান্ড</h4>
            <div className="space-y-1 text-xs max-h-40 overflow-y-auto scrollbar-thin">
              {brands.map((b) => (
                <label key={b.id} className="flex items-center space-x-2 cursor-pointer py-0.5">
                  <input
                    type="radio"
                    name="brand_filter"
                    checked={activeBrand === b.id}
                    onChange={() => {
                      searchParams.set('brand', b.id);
                      setSearchParams(searchParams);
                    }}
                    className="text-emerald-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">{b.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>সর্বোচ্চ দাম:</span>
              <span className="text-emerald-600 font-mono">৳{priceMax.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={500}
              max={160000}
              step={500}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>
        </div>

        {/* Right 4-Grid Product Catalog */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              প্রোডাক্টস ক্যাটালগ ({filteredProducts.length} টি পাওয়া গেছে)
            </h2>
          </div>

          {currentItems.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 text-sm">এই ফিল্টারে কোন প্রোডাক্ট পাওয়া যায়নি।</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};
