import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  products: Product[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ products }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 250);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = debouncedQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.articleSku.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.brandName?.toLowerCase().includes(debouncedQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/product/${slug}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="প্রোডাক্ট নাম, ব্র্যান্ড বা আর্টিক্যাল কোড দিয়ে সার্চ করুন..."
          className="w-full pl-10 pr-9 py-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && filtered.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            সার্চ ফলাফল ({filtered.length})
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-80 overflow-y-auto">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.slug)}
                className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer flex items-center space-x-3 transition"
              >
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center p-1 shrink-0">
                  <img src={item.coverImage} alt={item.name} className="max-h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="font-mono text-emerald-600 font-semibold">SKU: {item.articleSku}</span>
                    <span>•</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">৳{item.retailPrice}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
