import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, User, Phone, MapPin, CheckCircle2, AlertCircle, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { calculateDeliveryCost } from '../../utils/deliveryCalculator';
import { validateOrderForm } from '../../validations/orderValidation';
import { OrderService } from '../../services/orderService';
import { AuthService } from '../../services/authService';
import { PaymentService } from '../../services/paymentService';
import { PAYMENT_TYPES } from '../../constants/paymentTypes';
import { siteConfig } from '../../config/siteConfig';

export const OrderForm: React.FC = () => {
  const { items, totalAmount, totalWeight, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const { user, isAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');

  const [deliveryMethod, setDeliveryMethod] = useState<'Home Delivery' | 'Collect from Office' | 'From Collection Point'>('Home Delivery');
  const [deliveryArea, setDeliveryArea] = useState<'Inside Dhaka' | 'Outside Dhaka'>('Inside Dhaka');
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = totalAmount();
  const weight = totalWeight() || 0.5;
  const deliveryCharge = calculateDeliveryCost(deliveryMethod, deliveryArea, weight);
  const grandTotal = subtotal + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateOrderForm({
      customerName,
      customerPhone,
      shippingAddress,
      deliveryMethod,
      deliveryArea
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. If not authenticated, automatically create account and send SMS/email credentials
      if (!isAuthenticated) {
        const autoAccount = await AuthService.autoCreateCustomerOnOrder(
          customerName,
          customerPhone,
          shippingAddress,
          customerEmail
        );
        setUser(autoAccount);
      }

      // 2. Determine primary order type
      const hasPreOrder = items.some((i) => i.orderType === 'Pre-Order');
      const hasWholesale = items.some((i) => i.orderType === 'WholeSale');
      const finalOrderType = hasPreOrder ? 'Pre-Order' : hasWholesale ? 'WholeSale' : 'Retail';

      // 3. Create order
      const order = await OrderService.createOrder({
        customerName,
        customerPhone,
        customerEmail,
        shippingAddress: deliveryMethod === 'Collect from Office' ? 'অফিস সংগ্রহ (মহেশখালী হাব)' : shippingAddress,
        deliveryMethod,
        deliveryArea,
        orderType: finalOrderType,
        totalWeightKg: weight,
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          articleSku: i.product.articleSku,
          unitPrice: i.unitPrice,
          quantity: i.quantity,
          totalPrice: i.totalPrice,
          color: i.selectedColor,
          size: i.selectedSize
        })),
        subtotal,
        deliveryCharge,
        discount: 0,
        totalAmount: grandTotal,
        paymentMethod: selectedPayment,
        paymentStatus: selectedPayment === 'cod' ? 'Pending' : 'Paid',
        status: 'Pending'
      });

      // 4. Process Payment if online
      if (selectedPayment !== 'cod') {
        await PaymentService.processPayment(selectedPayment, order.orderNumber, grandTotal);
      }

      clearCart();
      navigate(`/track-order?orderNumber=${order.orderNumber}`);
    } catch (err) {
      console.error(err);
      alert('অর্ডার সম্পন্ন করতে সমস্যা হয়েছে, পুনরায় চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">কার্ট খালি আছে</h3>
        <p className="text-xs text-slate-500 mt-1">দয়া করে প্রোডাক্ট যোগ করুন।</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
      {/* Left Column: Customer details & Items */}
      <div className="lg:col-span-7 space-y-6">
        {/* Products in checkout */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            অর্ডারকৃত প্রোডাক্ট সমূহ ({items.length})
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 shrink-0 flex items-center justify-center">
                    <img src={item.product.coverImage} alt={item.product.name} className="max-h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      SKU: {item.product.articleSku} • ৳{item.unitPrice}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 w-16 text-right">
                    ৳{item.totalPrice}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
              <User className="w-4 h-4 text-emerald-600 mr-1.5" /> কাস্টমারের তথ্য
            </h3>
            {!isAuthenticated && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                * একাউন্ট না থাকলে অর্ডার সাথে সাথে অটো একাউন্ট হবে
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                আপনার নাম *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="যেমন: মোঃ জয়নাল আবেদীন"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              {errors.customerName && <p className="text-[11px] text-rose-500 mt-1">{errors.customerName}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                মোবাইল নম্বর (১১ ডিজিট) *
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="যেমন: 01351003958"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
              />
              {errors.customerPhone && <p className="text-[11px] text-rose-500 mt-1">{errors.customerPhone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              ই-মেইল এড্রেস (ঐচ্ছিক)
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="যেমন: dubaiwholesalebd@gmail.com"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Delivery Method Radio Cards */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
              ডেলিভারি পদ্ধতি নির্বাচন করুন *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'Home Delivery', title: 'Home Delivery', desc: 'সরাসরি বাসায় ডেলিভারি' },
                { id: 'Collect from Office', title: 'Collect from Office', desc: 'অফিস সংগ্রহ (০ টাকা চার্জ)' },
                { id: 'From Collection Point', title: 'From Collection Point', desc: 'নিকটস্থ কুরিয়ার পয়েন্ট' }
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setDeliveryMethod(m.id as any)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    deliveryMethod === m.id
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="delivery_method"
                      checked={deliveryMethod === m.id}
                      onChange={() => {}}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{m.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 pl-5">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Area (Only if not office pickup) */}
          {deliveryMethod !== 'Collect from Office' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                ডেলিভারি এরিয়া *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setDeliveryArea('Inside Dhaka')}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    deliveryArea === 'Inside Dhaka'
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="delivery_area"
                      checked={deliveryArea === 'Inside Dhaka'}
                      onChange={() => {}}
                    />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">ঢাকার ভিতরে (Inside Dhaka)</span>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 pl-5">
                    বেস চার্জ: ৯০ টাকা (প্রতি অতিরিক্ত কেজি +২০ টাকা)
                  </p>
                </div>

                <div
                  onClick={() => setDeliveryArea('Outside Dhaka')}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    deliveryArea === 'Outside Dhaka'
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="delivery_area"
                      checked={deliveryArea === 'Outside Dhaka'}
                      onChange={() => {}}
                    />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">ঢাকার বাইরে (Outside Dhaka)</span>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 pl-5">
                    বেস চার্জ: ১৩০ টাকা (প্রতি অতিরিক্ত কেজি +২০ টাকা)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Address */}
          {deliveryMethod !== 'Collect from Office' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                বিস্তারিত ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা/জেলা) *
              </label>
              <textarea
                rows={2}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="যেমন: বাড়ি ১২, রোড ৩, সেক্টর ৭, উত্তরা, ঢাকা অথবা মহেশখালী বাজার, কক্সবাজার"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              {errors.shippingAddress && <p className="text-[11px] text-rose-500 mt-1">{errors.shippingAddress}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Calculation & Payment Gateways */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            অর্ডার ক্যালকুলেশন ও পেমেন্ট
          </h3>

          <div className="space-y-3 my-4 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>প্রোডাক্ট মোট মূল্য</span>
              <span className="font-semibold text-slate-900 dark:text-white">৳{subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>পার্সেল ওজন</span>
              <span className="font-semibold text-slate-900 dark:text-white">{weight.toFixed(2)} কেজি</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>ডেলিভারি মেথড</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{deliveryMethod}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>ডেলিভারি চার্জ</span>
              <span className="font-bold text-emerald-600">
                {deliveryCharge === 0 ? '০ টাকা (ফ্রি)' : `৳${deliveryCharge}`}
              </span>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between font-extrabold text-base text-slate-900 dark:text-white">
              <span>সর্বমোট প্রদেয়</span>
              <span className="text-emerald-600">৳{grandTotal}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
              পেমেন্ট মেথড নির্বাচন করুন:
            </label>
            <div className="space-y-2">
              {PAYMENT_TYPES.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition text-xs ${
                    selectedPayment === p.id
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment_type"
                      checked={selectedPayment === p.id}
                      onChange={() => setSelectedPayment(p.id)}
                    />
                    <span className="text-slate-900 dark:text-white">{p.name}</span>
                  </div>
                  {p.default && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      ডিফল্ট
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center text-sm disabled:opacity-50"
          >
            {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডার কনফার্ম করুন (৳' + grandTotal + ')'}
          </button>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 space-y-1">
            <p className="flex items-center text-slate-700 dark:text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1.5 shrink-0" />
              টেকনো ওয়ার্ল্ড বিডি নিশ্চিন্ত কেনাকাটা
            </p>
            <p>• নতুন কাস্টমারদের জন্য অটো একাউন্ট তৈরি হয়ে এসএমএস/মেইল যাবে।</p>
            <p>• পণ্য হাতে পেয়ে চেক করার পর ২ সপ্তাহ রিপ্লেসমেন্ট ওয়ারেন্টি সুবিধা।</p>
          </div>
        </div>
      </div>
    </form>
  );
};
