import { useNavigate } from 'react-router-dom';
import { LogOut, ChevronRight } from 'lucide-react';
import { NAV_ITEMS, MOBILE_PRIMARY_IDS } from '../utils/navItems';

export default function MorePage() {
  const navigate = useNavigate();
  const secondaryItems = NAV_ITEMS.filter((item) => !MOBILE_PRIMARY_IDS.includes(item.id));

  return (
    <div className="md:hidden">
      <h2 className="text-lg font-semibold text-on-surface mb-4">Menu Lainnya</h2>
      <div className="glass-card rounded-2xl overflow-hidden divide-y divide-surface-container-highest">
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-primary/5 transition-colors"
            >
              <span className="flex items-center gap-3 text-sm font-medium text-on-surface">
                <Icon className="w-5 h-5 text-primary" />
                {item.label}
              </span>
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </button>
          );
        })}
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 px-4 py-4 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </div>
  );
}