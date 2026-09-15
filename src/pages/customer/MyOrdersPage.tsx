import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, XCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useOrders } from '../../hooks/useOrders';
import { OrderService } from '../../services/orderService';
import { ORDER_STATUS_COLORS } from '../../constants/orderStatus';

export const MyOrdersPage: React.FC = () => {
  const { user } = useAuthStore();
  const { orders, refetch } = useOrders(user?.phone);

  const handleCancel = async (id: string) => {
    if (confirm('আপনি কি এই পেন্ডিং অর্ডারটি বাতিল করতে চান?')) {
      await OrderService.cancelOrder(id);
      refetch();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
        আমার সকল অর্ডার ({orders.length})
      </h3>

      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o.id}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-xs text-emerald-600">{o.orderNumber}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${ORDER_STATUS_COLORS[o.status] || ''}`}>
                  {o.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                তারিখ: {new Date(o.createdAt).toLocaleDateString('bn-BD')} • মোট: ৳{o.totalAmount}
              </p>
              <p className="text-[11px] text-slate-500">
                আইটেম: {o.items.map((i) => i.productName).join(', ')}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to={`/track-order?orderNumber=${o.orderNumber}`}
                className="px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 transition flex items-center"
              >
                <Printer className="w-3.5 h-3.5 mr-1" /> চালান
              </Link>
              {o.status === 'Pending' && (
                <button
                  onClick={() => handleCancel(o.id)}
                  className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-100 transition flex items-center"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1" /> বাতিল
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
