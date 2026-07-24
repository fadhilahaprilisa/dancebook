const { pool } = require('../config/db');

async function getSummary() {
  const [[{ totalMurid }]] = await pool.query(
    "SELECT COUNT(*) AS totalMurid FROM students WHERE status = 'aktif'"
  );
  const [[{ totalDokumentasi }]] = await pool.query(
    'SELECT COUNT(*) AS totalDokumentasi FROM documentations'
  );
  const [[{ totalLatihan }]] = await pool.query(
    'SELECT COUNT(DISTINCT date) AS totalLatihan FROM attendances'
  );
  const [[{ totalKehadiranBulanIni }]] = await pool.query(
    `SELECT COUNT(*) AS totalKehadiranBulanIni FROM attendances
     WHERE status = 'hadir' AND MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())`
  );
  const [[lastDateRow]] = await pool.query('SELECT MAX(date) AS lastDate FROM attendances');

  let latihanTerakhir = null;
  if (lastDateRow?.lastDate) {
    const [rows] = await pool.query(
      'SELECT status, COUNT(*) AS total FROM attendances WHERE date = ? GROUP BY status',
      [lastDateRow.lastDate]
    );
    const counts = { hadir: 0, izin: 0, sakit: 0, alfa: 0 };
    rows.forEach((r) => {
      counts[r.status] = r.total;
    });
    latihanTerakhir = { tanggal: lastDateRow.lastDate, ...counts };
  }

  return { totalMurid, totalDokumentasi, totalLatihan, totalKehadiranBulanIni, latihanTerakhir };
}

module.exports = { getSummary };
