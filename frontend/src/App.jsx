import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ComingSoonPage from './pages/ComingSoonPage';
import MorePage from './pages/More';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';
import DataMuridPage from './pages/DataMurid';
import AbsensiPage from './pages/Absensi';
import NilaiRaporPage from './pages/NilaiRapor';
import DokumentasiPage from './pages/Dokumentasi';
import AgendaPage from './pages/Agenda';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="data-murid" element={<DataMuridPage />} />
        <Route path="absensi" element={<AbsensiPage />} />
        <Route path="nilai-rapor" element={<NilaiRaporPage />} />
        <Route path="dokumentasi" element={<DokumentasiPage />} />
        <Route path="agenda" element={<AgendaPage />} />
        <Route path="download-csv" element={<ComingSoonPage title="Download CSV" tahap={9} />} />
        <Route path="backup" element={<ComingSoonPage title="Backup Database" tahap={9} />} />
        <Route path="more" element={<MorePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;