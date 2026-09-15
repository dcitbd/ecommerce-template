import React from 'react';
import {
  LayoutDashboard, Package, Layers, Tag, Palette, Maximize,
  Image, ShoppingBag, Clock, RotateCcw, MessageSquare, Users,
  Truck, ShieldAlert, UserCheck, Activity, Settings, LogOut, X
} from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose
}) => {
  const { logout, user } = useAuthStore();

  const menuSections = [
    {
      title: 'ওভারভিউ',
      items: [
        { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: <LayoutDashboard className="w-4 h-4" /> },
      ]
    },
    {
      title: 'ক্যাটালগ ও প্রোডাক্ট',
      items: [
        { id: 'products', label: 'প্রোডাক্ট ম্যানেজমেন্ট', icon: <Package className="w-4 h-4" /> },
        { id: 'categories', label: 'ক্যাটাগরি ট্রি', icon: <Layers className="w-4 h-4" /> },
        { id: 'brands', label: 'ব্র্যান্ড ম্যানেজমেন্ট', icon: <Tag className="w-4 h-4" /> },
        { id: 'colors', label: 'কালার লিস্ট', icon: <Palette className="w-4 h-4" /> },
        { id: 'sizes', label: 'সাইজ / কিট', icon: <Maximize className="w-4 h-4" /> },
        { id: 'banners', label: 'ব্যানার কন্ট্রোল', icon: <Image className="w-4 h-4" /> },
      ]
    },
    {
      title: 'অর্ডার অপারেশনস',
      items: [
        { id: 'orders', label: 'সকল অর্ডার সমূহ', icon: <ShoppingBag className="w-4 h-4" /> },
        { id: 'incomplete', label: 'ইনকমপ্লিট অর্ডার', icon: <Clock className="w-4 h-4" /> },
        { id: 'returns', label: 'রিটার্ন অর্ডার', icon: <RotateCcw className="w-4 h-4" /> },
        { id: 'reviews', label: 'রিভিউ মডারেশন', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'customers', label: 'কাস্টমার ডিরেক্টরি', icon: <Users className="w-4 h-4" /> },
      ]
    },
    {
      title: 'পার্টনার্স ও নিরাপত্তা',
      items: [
        { id: 'partners', label: 'কুরিয়ার ও পেমেন্ট API', icon: <Truck className="w-4 h-4" /> },
        { id: 'fraud', label: 'ফ্রড চেক টুল', icon: <ShieldAlert className="w-4 h-4" /> },
        { id: 'users', label: 'এডমিন ও স্টাফ রোল', icon: <UserCheck className="w-4 h-4" /> },
        { id: 'activity', label: 'এক্টিভ হিস্ট্রি (লগ)', icon: <Activity className="w-4 h-4" /> },
        { id: 'settings', label: 'সিস্টেম সেটিংস', icon: <Settings className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Admin Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Techno World BD" className="h-8 w-auto" />
            </div>
            <button onClick={onClose} className="lg:hidden p-1 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User mini badge */}
          <div className="px-4 py-3 bg-slate-800/40 border-b border-slate-800 flex items-center space-x-3 text-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              {user?.fullName.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-white truncate">{user?.fullName}</p>
              <p className="text-[10px] text-emerald-400 capitalize">{user?.role.replace('_', ' ')}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-4 space-y-5 overflow-y-auto max-h-[calc(100vh-180px)] text-xs scrollbar-thin">
            {menuSections.map((sec, idx) => (
              <div key={idx}>
                <div className="px-2 pb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {sec.title}
                </div>
                <div className="space-y-0.5">
                  {sec.items.map((item) => {
                    const active = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          onClose();
                        }}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg font-medium transition ${
                          active
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'hover:bg-slate-800 hover:text-white text-slate-400'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট করুন</span>
          </button>
        </div>
      </aside>
    </>
  );
};
