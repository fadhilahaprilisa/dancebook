import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { NAV_ITEMS } from '../utils/navItems';
import { logout } from '../services/authService';

function SidebarContent({ onNavigate }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onNavigate?.();
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <div className="flex flex-col gap-2 px-4 py-5 border-b border-surface-container">
        <span className="font-bold text-2xl text-primary tracking-tight">DanceBook</span>

        <div className="flex items-center gap-3 mt-4">
          <div className="w-11 h-11 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-semibold ring-2 ring-primary-container/60">
            G
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface leading-tight">
              Guru Ekstrakurikuler
            </p>
            <p className="text-[11px] text-on-surface-variant">Tari Sekolah Dasar</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 px-2 mt-4 flex-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                    : 'text-on-surface-variant hover:bg-secondary-container/50 hover:text-on-surface'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </>
  );
}

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  return (
    <>
      <aside className="hidden md:flex flex-col h-full fixed inset-y-0 left-0 w-72 z-40 bg-surface border-r border-surface-container-highest">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-72 h-full bg-surface flex flex-col shadow-2xl">
            <SidebarContent onNavigate={onCloseMobile} />
          </div>
          <div className="flex-1 bg-black/30" onClick={onCloseMobile} />
        </div>
      )}
    </>
  );
}