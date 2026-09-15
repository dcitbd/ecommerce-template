import React, { useState } from 'react';
import { Search, Download, Printer, Truck, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { Order, OrderStatus } from '../../../types/order';
import { ORDER_STATUSES, ORDER_STATUS_COLORS } from '../../../constants/orderStatus';
import { OrderService } from '../../../services/orderService';
import { CourierService } from '../../../services/courierService';
import { FraudService } from '../../../services/fraudService';
import { exportToExcel } from '../../../utils/excelExporter';

interface OrderManagerProps {
  orders: Order[];
  onRefresh: () => void;
  onOpenVoucher: (order: Order) => void;
}

export const OrderManagerTable: React.FC<OrderManagerProps> = ({ orders, onRefresh, onOpenVoucher }) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    const matchSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await OrderService.updateOrderStatus(orderId, newStatus);
    onRefresh();
  };

  const handleSendToCourier = async (order: Order) => {
    const courier = prompt('কুরিয়ার নির্বাচন করুন (Steadfast / Pathao / RedX):', 'Steadfast');
    if (courier) {
      const res = await CourierService.dispatchToCourier(courier, {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerAddress: order.shippingAddress,
        deliveryArea: order.deliveryArea,
        collectionAmount: order.paymentStatus === 'Paid' ? 0 : order.totalAmount,
        weightKg: order.totalWeightKg
      });
      alert(`কুরিয়ারে সফলভাবে পার্সেল বুকিং হয়েছে!\nকনসাইনমেন্ট আইডি: ${res.consignmentId}\nট্র্যাকিং কোড: ${res.trackingCode}`);
      await OrderService.updateOrderStatus(order.id, 'Sent');
      onRefresh();
    }
  };

  const handleExport = () => {
    const data = filteredOrders.map((o) => ({
      Order_Number: o.orderNumber,
      Customer_Name: o.customerName,
      Phone: o.customerPhone,
      Address: o.shippingAddress,
      Method: o.deliveryMethod,
      Area: o.deliveryArea,
      Subtotal: o.subtotal,
      Delivery_Charge: o.deliveryCharge,
      Total: o.totalAmount,
      Payment: o.paymentMethod,
      Status: o.status,
      Created_At: o.createdAt
    }));
    exportToExcel('Techno_World_BD_Orders', data);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      {/* Filter Tabs / Counter Cards */}
      <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setFilterStatus('All')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            filterStatus === 'All' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          সকল ({orders.length})
        </button>
        {ORDER_STATUSES.map((st) => {
          const count = orders.filter((o) => o.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterStatus === st ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="অর্ডার নং, নাম বা ফোন দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <button
          onClick={handleExport}
          className="px-3 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition flex items-center"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" /> এক্সপোর্ট (Excel)
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-bold">
              <th className="py-3 px-3">অর্ডার আইডি</th>
              <th className="py-3 px-3">কাস্টমার ও যোগাযোগ</th>
              <th className="py-3 px-3">অর্ডার টাইপ</th>
              <th className="py-3 px-3">মোট মূল্য</th>
              <th className="py-3 px-3">ফ্রড চেক</th>
              <th className="py-3 px-3">স্ট্যাটাস</th>
              <th className="py-3 px-3 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              return (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-mono font-bold text-emerald-600">
                      {order.orderNumber}
                    </td>

                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900 dark:text-white">{order.customerName}</p>
                      <p className="text-[11px] font-mono text-slate-500">{order.customerPhone}</p>
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-semibold">
                        {order.orderType}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      ৳{order.totalAmount}
                    </td>

                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                        {order.fraudRisk || 'ভেরিফাইড'}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`text-[11px] font-bold px-2 py-1 rounded border outline-none cursor-pointer ${
                          ORDER_STATUS_COLORS[order.status] || 'bg-slate-100'
                        }`}
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleSendToCourier(order)}
                        className="px-2 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded font-bold transition"
                        title="কুরিয়ারে পাঠান"
                      >
                        <Truck className="w-3.5 h-3.5 inline mr-1" />
                        কুরিয়ার
                      </button>

                      <button
                        onClick={() => onOpenVoucher(order)}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded font-bold transition"
                        title="চালান প্রিন্ট"
                      >
                        <Printer className="w-3.5 h-3.5 inline mr-1" />
                        চালান
                      </button>

                      <button
                        onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                        className="px-2 py-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />}
                      </button>
                    </td>
                  </tr>

                  {/* Accordion Expand for Order Details */}
                  {isExpanded && (
                    <tr className="bg-slate-50/70 dark:bg-slate-800/30">
                      <td colSpan={7} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs border p-3 rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                          <div>
                            <p className="font-bold text-slate-700 dark:text-slate-300">ঠিকানা ও ডেলিভারি:</p>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">{order.shippingAddress}</p>
                            <p className="text-[11px] text-slate-500 mt-1">
                              মেথড: {order.deliveryMethod} • এরিয়া: {order.deliveryArea}
                            </p>
                          </div>

                          <div>
                            <p className="font-bold text-slate-700 dark:text-slate-300">প্রোডাক্ট বিবরণ:</p>
                            <ul className="mt-1 space-y-1">
                              {order.items.map((it, i) => (
                                <li key={i} className="text-slate-600 dark:text-slate-400">
                                  {it.productName} (SKU: {it.articleSku}) × {it.quantity} = ৳{it.totalPrice}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="font-bold text-slate-700 dark:text-slate-300">পেমেন্ট ও ট্র্যাকিং:</p>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">
                              মেথড: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                            </p>
                            {order.courierTrackingCode && (
                              <p className="text-emerald-600 font-mono mt-1 font-bold">
                                কুরিয়ার ট্র্যাকিং: {order.courierTrackingCode} ({order.courierName})
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
