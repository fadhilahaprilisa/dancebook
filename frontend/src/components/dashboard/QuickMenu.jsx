import { useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../../utils/navItems';

export default function QuickMenu() {
  const navigate = useNavigate();
  const menuItems = NAV_ITEMS.filter((item) => item.id !== 'dashboard');

  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <h2 className="text-sm font-semibold text-on-surface mb-4">Menu Cepat</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-surface-container-low hover:bg-primary-container/60 transition-colors text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center group-hover:bg-white/70 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-on-surface">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}