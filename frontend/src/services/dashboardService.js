// TODO (Tahap 10): ganti dengan GET /api/dashboard/summary yang sesungguhnya
// setelah backend & database terhubung.
const MOCK_SUMMARY = {
  totalMurid: 24,
  totalDokumentasi: 37,
  totalLatihan: 18,
  totalKehadiranBulanIni: 68,
  latihanTerakhir: {
    tanggal: '2026-07-15',
    hadir: 20,
    izin: 2,
    sakit: 1,
    alfa: 1,
  },
};

export async function getDashboardSummary() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_SUMMARY;
}