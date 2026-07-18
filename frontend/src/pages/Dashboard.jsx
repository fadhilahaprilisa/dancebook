import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Image as ImageIcon, Sparkles, CalendarCheck, Check, Plus } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import LastPracticeWidget from '../components/dashboard/LastPracticeWidget';
import QuickMenu from '../components/dashboard/QuickMenu';
import { getDashboardSummary } from '../services/dashboardService';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return 'Selamat Pagi';
  if (hour < 15) return 'Selamat Siang';
  if (hour < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getDashboardSummary().then((data) => {
      if (isMounted) {
        setSummary(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-1">
            {getGreeting()}, Bu Guru!
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant">
            Berikut ringkasan ekstrakurikuler tari hari ini.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/absensi')}
            className="bg-primary text-on-primary font-medium px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-95 text-sm shadow-soft"
          >
            <Check className="w-4 h-4" /> Isi Absensi
          </button>
          <button
            onClick={() => navigate('/data-murid')}
            className="border border-primary text-primary font-medium px-5 py-2.5 rounded-full hover:bg-primary-container/30 transition-all flex items-center gap-2 active:scale-95 text-sm"
          >
            <Plus className="w-4 h-4" /> Tambah Murid
          </button>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Jumlah Murid" value={summary?.totalMurid} isLoading={isLoading} />
        <StatCard
          icon={ImageIcon}
          label="Jumlah Dokumentasi"
          value={summary?.totalDokumentasi}
          isLoading={isLoading}
        />
        <StatCard
          icon={Sparkles}
          label="Jumlah Latihan"
          value={summary?.totalLatihan}
          isLoading={isLoading}
        />
        <StatCard
          icon={CalendarCheck}
          label="Kehadiran Bulan Ini"
          value={summary?.totalKehadiranBulanIni}
          isLoading={isLoading}
        />
      </section>

      {/* Widget Latihan Terakhir + Quick Menu */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <LastPracticeWidget data={summary?.latihanTerakhir} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-7">
          <QuickMenu />
        </div>
      </section>
    </div>
  );
}