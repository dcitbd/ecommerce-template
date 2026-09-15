import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardStats } from '../../components/admin/dashboard/DashboardStats';
import { ProductTable } from '../../components/admin/products/ProductTable';
import { OrderManagerTable } from '../../components/admin/orders/OrderManagerTable';
import { FraudCheckTool } from '../../components/admin/fraud/FraudCheckTool';
import { ActivityLogTable } from '../../components/admin/activity/ActivityLogTable';
import { GeneralSettingsForm } from '../../components/admin/settings/GeneralSettingsForm';
import { Modal } from '../../components/common/Modal';
import { VoucherPrintView } from '../../components/order/VoucherPrintView';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';
import { ProductService } from '../../services/productService';
import { Product } from '../../types/product';
import { Order } from '../../types/order';

export const AdminDashboardPage: React.FC = () => {
  const { activeTab } = useOutletContext<{ activeTab: string }>();
  const { products, refetch: refetchProducts } = useProducts();
  const { orders, refetch: refetchOrders } = useOrders();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVoucherOrder, setSelectedVoucherOrder] = useState<Order | null>(null);

  // Form states for Add Product
  const [formSku, setFormSku] = useState('');
  const [formName, setFormName] = useState('');
  const [formRetailPrice, setFormRetailPrice] = useState(1000);
  const [formMrpPrice, setFormMrpPrice] = useState(1200);
  const [formWholesalePrice, setFormWholesalePrice] = useState(850);
  const [formStock, setFormStock] = useState(50);
  const [formCategory, setFormCategory] = useState('cat_smartwatch');
  const [formError, setFormError] = useState('');

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const res = await ProductService.saveProduct({
      articleSku: formSku,
      name: formName,
      retailPrice: formRetailPrice,
      mrpPrice: formMrpPrice,
      wholesalePrice: formWholesalePrice,
      stock: formStock,
      categoryId: formCategory
    });

    if (!res.success) {
      setFormError(res.error || 'ত্রুটি!');
    } else {
      setIsAddModalOpen(false);
      refetchProducts();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Counters */}
      <DashboardStats products={products} orders={orders} />

      {/* Render tab based on sidebar selection */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <OrderManagerTable
            orders={orders}
            onRefresh={refetchOrders}
            onOpenVoucher={(o) => setSelectedVoucherOrder(o)}
          />
          <ProductTable
            products={products}
            onRefresh={refetchProducts}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onOpenBulkModal={() => alert('এক্সেল সিট আপলোড উইন্ডো প্রস্তুত।')}
            onEditProduct={(p) => {
              setFormSku(p.articleSku);
              setFormName(p.name);
              setIsAddModalOpen(true);
            }}
          />
        </div>
      )}

      {activeTab === 'products' && (
        <ProductTable
          products={products}
          onRefresh={refetchProducts}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onOpenBulkModal={() => alert('বাল্ক ফাইল আপলোড')}
          onEditProduct={() => setIsAddModalOpen(true)}
        />
      )}

      {activeTab === 'orders' && (
        <OrderManagerTable
          orders={orders}
          onRefresh={refetchOrders}
          onOpenVoucher={(o) => setSelectedVoucherOrder(o)}
        />
      )}

      {activeTab === 'fraud' && <FraudCheckTool />}
      {activeTab === 'activity' && <ActivityLogTable />}
      {activeTab === 'settings' && <GeneralSettingsForm />}

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="নতুন প্রোডাক্ট যুক্তকরণ (অনন্য SKU নিশ্চিত করুন)"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg font-bold">
              {formError}
            </div>
          )}

          <div>
            <label className="block font-bold mb-1">আর্টিক্যাল / SKU কোড (Unique) *</label>
            <input
              type="text"
              value={formSku}
              onChange={(e) => setFormSku(e.target.value)}
              placeholder="যেমন: TW-HWT-01"
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950 font-mono uppercase"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">প্রোডাক্টের নাম *</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="যেমন: Huawei Watch GT 4"
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold mb-1">MRP দাম</label>
              <input
                type="number"
                value={formMrpPrice}
                onChange={(e) => setFormMrpPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">রিটেইল দাম *</label>
              <input
                type="number"
                value={formRetailPrice}
                onChange={(e) => setFormRetailPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-1">হোলসেল দাম</label>
              <input
                type="number"
                value={formWholesalePrice}
                onChange={(e) => setFormWholesalePrice(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">স্টক পরিমাণ</label>
              <input
                type="number"
                value={formStock}
                onChange={(e) => setFormStock(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">ক্যাটাগরি</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
              >
                <option value="cat_smartwatch">Smartwatches & Wearables</option>
                <option value="cat_torch">Flashlights & Torches</option>
                <option value="cat_audio">Audio & Speakers</option>
                <option value="cat_dubai">Dubai Pre-Order Specials</option>
                <option value="cat_office">Computer & Office Peripherals</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
          >
            পাবলিশ করুন
          </button>
        </form>
      </Modal>

      {/* Printable Voucher Modal */}
      {selectedVoucherOrder && (
        <Modal
          isOpen={!!selectedVoucherOrder}
          onClose={() => setSelectedVoucherOrder(null)}
          title="অর্ডার ভাউচার / চালান প্রিভিউ"
          maxWidth="4xl"
        >
          <VoucherPrintView order={selectedVoucherOrder} />
        </Modal>
      )}
    </div>
  );
};
