import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, X, AlertCircle } from 'lucide-react';
import { NAV_ITEMS } from '../utils/navItems';

export default function Header({ onToggleSidebar }) {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const activeItem = NAV_ITEMS.find((item) => location.pathname.startsWith(item.path));
  const title = activeItem ? activeItem.label : 'DanceBook';
  const notifications = []; // akan diisi data asli pada Tahap 10 (integrasi backend)

  return (
    <header className="bg-surface/85 backdrop-blur-md sticky top-0 z-30 border-b border-surface-container-highest shadow-sm flex items-center justify-between px-5 md:px-8 h-16 w-full">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 hover:bg-primary/10 rounded-full transition-colors active:scale-95"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-6 h-6 text-primary" />
        </button>
        <h1 className="font-semibold text-lg text-primary tracking-tight">{title}</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowNotifications((prev) => !prev)}
          className="p-2 hover:bg-primary/10 rounded-full transition-colors relative"
          aria-label="Notifikasi"
        >
          <Bell className="w-5 h-5 text-primary" />
          {notifications.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface" />
          )}
        </button>

        {showNotifications && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
            <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-xl border border-surface-container-highest p-4 z-40">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <h4 className="font-semibold text-primary text-sm">Notifikasi</h4>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-on-surface-variant hover:text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3">
                <div className="py-6 text-center text-on-surface-variant">
                  <AlertCircle className="w-8 h-8 mx-auto text-on-surface-variant/40 mb-2" />
                  <p className="text-xs">Tidak ada notifikasi baru</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}