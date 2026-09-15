import React, { useState } from 'react';
import { Edit, Trash2, Plus, Upload, Download, Search, Check, X, Copy } from 'lucide-react';
import { Product } from '../../../types/product';
import { ProductService } from '../../../services/productService';
import { exportToExcel } from '../../../utils/excelExporter';

interface ProductTableProps {
  products: Product[];
  onRefresh: () => void;
  onOpenAddModal: () => void;
  onOpenBulkModal: () => void;
  onEditProduct: (p: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onRefresh,
  onOpenAddModal,
  onOpenBulkModal,
  onEditProduct
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [stockValue, setStockValue] = useState<number>(0);

  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [priceValue, setPriceValue] = useState<number>(0);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.articleSku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brandName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockSave = async (id: string) => {
    await ProductService.updateStockInline(id, stockValue);
    setEditingStockId(null);
    onRefresh();
  };

  const handlePriceSave = async (id: string) => {
    await ProductService.updatePriceInline(id, priceValue);
    setEditingPriceId(null);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি নিশ্চিত এই প্রোডাক্টটি ডিলিট করতে চান?')) {
      await ProductService.deleteProduct(id);
      onRefresh();
    }
  };

  const handleDuplicate = async (p: Product) => {
    const newSku = prompt('ডুপ্লিকেট করার জন্য নতুন আর্টিক্যাল/SKU দিন:', `${p.articleSku}-COPY`);
    if (newSku) {
      const res = await ProductService.saveProduct({
        ...p,
        id: undefined,
        articleSku: newSku,
        name: `${p.name} (Copy)`
      });
      if (!res.success) {
        alert(res.error);
      } else {
        onRefresh();
      }
    }
  };

  const handleExport = () => {
    const exportData = products.map((p) => ({
      Article_SKU: p.articleSku,
      Product_Name: p.name,
      Category: p.categoryName,
      Brand: p.brandName,
      MRP: p.mrpPrice,
      Retail_Price: p.retailPrice,
      Wholesale_Price: p.wholesalePrice || '',
      Stock: p.stock,
      Weight_Kg: p.weightKg,
      Orders: p.totalOrders,
      Views: p.totalViews
    }));
    exportToExcel('Techno_World_BD_Products_Catalog', exportData);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SKU, নাম বা ব্র্যান্ড খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleExport}
            className="px-3 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition flex items-center"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" /> এক্সপোর্ট
          </button>
          <button
            onClick={onOpenBulkModal}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition flex items-center"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" /> বাল্ক আপলোড
          </button>
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/20 transition flex items-center"
          >
            <Plus className="w-4 h-4 mr-1.5" /> নতুন প্রোডাক্ট যোগ
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-bold">
              <th className="py-3 px-3">প্রোডাক্ট তথ্য (Image | Name | SKU)</th>
              <th className="py-3 px-3">অর্ডার / লাভ / ভিউ</th>
              <th className="py-3 px-3">অর্ডার টাইপ</th>
              <th className="py-3 px-3">প্রাইজ (ক্লিক এডিট)</th>
              <th className="py-3 px-3">স্টক (ক্লিক এডিট)</th>
              <th className="py-3 px-3">স্ট্যাটাস</th>
              <th className="py-3 px-3 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 shrink-0 flex items-center justify-center">
                    <img src={product.coverImage} alt={product.name} className="max-h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white truncate max-w-xs">{product.name}</p>
                    <p className="text-[11px] font-mono text-emerald-600 font-semibold">{product.articleSku}</p>
                  </div>
                </td>

                <td className="py-3 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <span>অর্ডার: {product.totalOrders}</span> • <span>ভিউ: {product.totalViews}</span>
                </td>

                <td className="py-3 px-3">
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
                    {product.orderTypes.join(', ')}
                  </span>
                </td>

                {/* Inline Price Edit */}
                <td className="py-3 px-3 font-mono font-bold">
                  {editingPriceId === product.id ? (
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        value={priceValue}
                        onChange={(e) => setPriceValue(Number(e.target.value))}
                        className="w-20 px-1 py-0.5 border rounded text-xs bg-white dark:bg-slate-900"
                        autoFocus
                      />
                      <button onClick={() => handlePriceSave(product.id)} className="text-emerald-500">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setEditingPriceId(null)} className="text-slate-400">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span
                      onClick={() => {
                        setEditingPriceId(product.id);
                        setPriceValue(product.retailPrice);
                      }}
                      className="cursor-pointer border-b border-dashed border-slate-400 hover:text-emerald-600"
                      title="মূল্য পরিবর্তন করতে ক্লিক করুন"
                    >
                      ৳{product.retailPrice}
                    </span>
                  )}
                </td>

                {/* Inline Stock Edit */}
                <td className="py-3 px-3 font-mono font-bold">
                  {editingStockId === product.id ? (
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        value={stockValue}
                        onChange={(e) => setStockValue(Number(e.target.value))}
                        className="w-16 px-1 py-0.5 border rounded text-xs bg-white dark:bg-slate-900"
                        autoFocus
                      />
                      <button onClick={() => handleStockSave(product.id)} className="text-emerald-500">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setEditingStockId(null)} className="text-slate-400">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span
                      onClick={() => {
                        setEditingStockId(product.id);
                        setStockValue(product.stock);
                      }}
                      className={`cursor-pointer border-b border-dashed ${
                        product.stock <= 0 ? 'text-rose-500 border-rose-400' : 'hover:text-emerald-600 border-slate-400'
                      }`}
                      title="স্টক পরিবর্তন করতে ক্লিক করুন"
                    >
                      {product.stock} পিস
                    </span>
                  )}
                </td>

                <td className="py-3 px-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                      product.isActive
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {product.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </span>
                </td>

                <td className="py-3 px-3 text-right space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => handleDuplicate(product)}
                    className="p-1 text-slate-500 hover:text-emerald-600 transition"
                    title="ডুপ্লিকেট করুন"
                  >
                    <Copy className="w-3.5 h-3.5 inline" />
                  </button>
                  <button
                    onClick={() => onEditProduct(product)}
                    className="p-1 text-slate-500 hover:text-blue-600 transition"
                    title="এডিট করুন"
                  >
                    <Edit className="w-3.5 h-3.5 inline" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-1 text-slate-500 hover:text-rose-600 transition"
                    title="ডিলিট করুন"
                  >
                    <Trash2 className="w-3.5 h-3.5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
