import { NavLink, useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { NAV_ITEMS, MOBILE_PRIMARY_IDS } from '../utils/navItems';

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const primaryItems = NAV_ITEMS.filter((item) => MOBILE_PRIMARY_IDS.includes(item.id));

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 z-30 bg-surface-container-lowest/95 backdrop-blur-md border-t border-surface-container-highest shadow-[0_-4px_20px_0_rgba(233,30,99,0.10)] flex items-center justify-around px-2 pb-safe">
      {primaryItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all ${
                isActive
                  ? 'bg-primary-container/70 text-on-primary-container font-bold'
                  : 'text-on-surface-variant'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </NavLink>
        );
      })}
      <button
        onClick={() => navigate('/more')}
        className="flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl text-on-surface-variant"
      >
        <MoreHorizontal className="w-5 h-5" />
        <span className="text-[10px] font-semibold">Lainnya</span>
      </button>
    </nav>
  );
}