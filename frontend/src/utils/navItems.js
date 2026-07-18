import {
  LayoutDashboard,
  Users,
  CheckSquare,
  GraduationCap,
  Image as ImageIcon,
  Calendar,
  Download,
  Database,
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { id: 'murid', label: 'Data Murid', path: '/data-murid', icon: Users },
  { id: 'absensi', label: 'Absensi', path: '/absensi', icon: CheckSquare },
  { id: 'nilai', label: 'Nilai Rapor', path: '/nilai-rapor', icon: GraduationCap },
  { id: 'dokumentasi', label: 'Dokumentasi', path: '/dokumentasi', icon: ImageIcon },
  { id: 'agenda', label: 'Agenda', path: '/agenda', icon: Calendar },
  { id: 'csv', label: 'Download CSV', path: '/download-csv', icon: Download },
  { id: 'backup', label: 'Backup Database', path: '/backup', icon: Database },
];

// 4 menu utama yang tampil di bottom nav mobile, sisanya masuk ke menu "Lainnya"
export const MOBILE_PRIMARY_IDS = ['dashboard', 'murid', 'absensi', 'nilai'];