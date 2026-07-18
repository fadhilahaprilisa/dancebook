import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ComingSoonPage from './pages/ComingSoonPage';
import MorePage from './pages/More';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<ComingSoonPage title="Login" tahap={2} />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<ComingSoonPage title="Dashboard" tahap={3} />} />
        <Route path="data-murid" element={<ComingSoonPage title="Data Murid" tahap={4} />} />
        <Route path="absensi" element={<ComingSoonPage title="Absensi" tahap={5} />} />
        <Route path="nilai-rapor" element={<ComingSoonPage title="Nilai Rapor" tahap={6} />} />
        <Route path="dokumentasi" element={<ComingSoonPage title="Dokumentasi" tahap={7} />} />
        <Route path="agenda" element={<ComingSoonPage title="Agenda" tahap={8} />} />
        <Route path="download-csv" element={<ComingSoonPage title="Download CSV" tahap={9} />} />
        <Route path="backup" element={<ComingSoonPage title="Backup Database" tahap={9} />} />
        <Route path="more" element={<MorePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;