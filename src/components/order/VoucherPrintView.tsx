import React from 'react';
import { Printer, Download, ArrowLeft, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { Order } from '../../types/order';
import { generateBarcodeSvgUri } from '../../utils/barcodeGenerator';
import { siteConfig } from '../../config/siteConfig';

interface VoucherProps {
  order: Order;
}

export const VoucherPrintView: React.FC<VoucherProps> = ({ order }) => {
  const barcodeUri = generateBarcodeSvgUri(order.orderNumber);

  return (
    <div className="max-w-3xl mx-auto my-8 p-4">
      {/* Action Header */}
      <div className="flex items-center justify-between mb-4 print:hidden">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> ফিরে যান
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow transition"
        >
          <Printer className="w-4 h-4 mr-1.5" /> প্রিন্ট / চালান ডাউনলোড (Voucher)
        </button>
      </div>

      {/* Printable Voucher Card with Watermark */}
      <div
        id="printable-voucher"
        className="relative bg-white text-slate-900 p-8 rounded-2xl border-2 border-slate-300 shadow-xl overflow-hidden font-sans"
        style={{ minHeight: '650px' }}
      >
        {/* Background Watermark */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 select-none"
          style={{
            backgroundImage: 'url(/watermark.svg)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '400px'
          }}
        />

        {/* Voucher Header */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Techno World BD" className="h-10 w-auto" />
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">{siteConfig.name}</p>
            <p className="text-[11px] text-slate-500">{siteConfig.slogan || 'সেরা দামে পাইকারি ও প্রি-অর্ডার গ্যাজেট শপ'}</p>
            <p className="text-[11px] text-slate-500">{siteConfig.address}</p>
            <p className="text-[11px] text-slate-500">হেল্পলাইন: {siteConfig.phone} | {siteConfig.email}</p>
          </div>

          <div className="text-right flex flex-col items-end">
            <span className="text-xl font-black tracking-wider text-slate-900">অফিশিয়াল চালান</span>
            <span className="text-xs font-mono font-bold text-emerald-700 mt-1">
              নং: {order.orderNumber}
            </span>
            <img src={barcodeUri} alt="Barcode" className="h-10 mt-2" />
            <span className="text-[10px] text-slate-400 font-mono mt-0.5">{order.orderNumber}</span>
          </div>
        </div>

        {/* Customer & Order Metadata */}
        <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
          <div>
            <h5 className="font-bold text-slate-900 uppercase">গ্রাহকের বিবরণ:</h5>
            <p className="font-semibold text-slate-800 mt-1">{order.customerName}</p>
            <p className="text-slate-600">ফোন: {order.customerPhone}</p>
            {order.customerEmail && <p className="text-slate-600">ই-মেইল: {order.customerEmail}</p>}
            <p className="text-slate-600">ঠিকানা: {order.shippingAddress}</p>
          </div>
          <div className="text-right">
            <h5 className="font-bold text-slate-900 uppercase">অর্ডার বিবরণ:</h5>
            <p className="text-slate-600 mt-1">তারিখ: {new Date(order.createdAt).toLocaleDateString('bn-BD')}</p>
            <p className="text-slate-600">ডেলিভারি পদ্ধতি: {order.deliveryMethod} ({order.deliveryArea})</p>
            <p className="text-slate-600">পেমেন্ট মেথড: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})</p>
            <p className="text-slate-600">অর্ডার স্ট্যাটাস: <span className="font-bold text-emerald-600">{order.status}</span></p>
          </div>
        </div>

        {/* Items Table */}
        <div className="my-6">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b-2 border-slate-800 bg-slate-100 text-slate-900 font-bold">
                <th className="py-2 px-3">ক্রম</th>
                <th className="py-2 px-3">প্রোডাক্ট বিবরণ ও আর্টিক্যাল</th>
                <th className="py-2 px-3 text-center">পরিমাণ</th>
                <th className="py-2 px-3 text-right">একক মূল্য</th>
                <th className="py-2 px-3 text-right">মোট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 px-3 font-mono">{idx + 1}</td>
                  <td className="py-2.5 px-3">
                    <p className="font-bold text-slate-800">{item.productName}</p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      SKU: {item.articleSku} {item.color ? `• ${item.color}` : ''} {item.size ? `• ${item.size}` : ''}
                    </p>
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold">{item.quantity}</td>
                  <td className="py-2.5 px-3 text-right font-mono">৳{item.unitPrice}</td>
                  <td className="py-2.5 px-3 text-right font-bold font-mono">৳{item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Breakdown */}
        <div className="flex justify-end pt-4 border-t border-slate-200 text-xs">
          <div className="w-64 space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>সাব-টোটাল:</span>
              <span className="font-mono">৳{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>ডেলিভারি চার্জ:</span>
              <span className="font-mono">৳{order.deliveryCharge}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-rose-600">
                <span>ডিসকাউন্ট:</span>
                <span className="font-mono">-৳{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black border-t border-slate-800 pt-2 text-slate-900">
              <span>সর্বমোট প্রদেয়:</span>
              <span className="font-mono text-emerald-700">৳{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Voucher Footer */}
        <div className="mt-12 pt-4 border-t border-slate-300 flex justify-between items-end text-[10px] text-slate-500">
          <div>
            <p className="font-bold text-slate-700">শর্তাবলী:</p>
            <p>১. পণ্য রিসিভ করার পর থেকে ১৪ দিন (২ সপ্তাহ) ওয়ারেন্টি প্রযোজ্য।</p>
            <p>২. প্রি-অর্ডার পণ্যের ডেলিভারি সময় সাধারণত ১০-১৫ দিন।</p>
            <p>৩. যে কোনো প্রয়োজনে কাস্টমার কেয়ারে ভাউচার নম্বর উল্লেখ করুন।</p>
          </div>
          <div className="text-right">
            <div className="w-36 border-b border-slate-400 mb-1" />
            <p className="font-bold text-slate-800">অনুমোদিত স্বাক্ষর</p>
            <p>Techno World BD Authority</p>
          </div>
        </div>
      </div>
    </div>
  );
};
