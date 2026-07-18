// Utility pengurutan "Kelas" bebas teks (mis. 1, 1A, 1B, 2, 4A, 4B, 6B).
// Dipakai di seluruh modul yang menampilkan/menyortir data per kelas
// (Data Murid, Absensi, Nilai Rapor, dst) agar urutannya konsisten.
export function parseKelas(kelas) {
  const match = String(kelas).trim().match(/^(\d+)\s*([A-Za-z]*)$/);
  if (!match) {
    return { num: Number.MAX_SAFE_INTEGER, letter: String(kelas).trim().toUpperCase() };
  }
  return { num: parseInt(match[1], 10), letter: match[2].toUpperCase() };
}

export function compareKelas(a, b) {
  const pa = parseKelas(a);
  const pb = parseKelas(b);
  if (pa.num !== pb.num) return pa.num - pb.num;
  return pa.letter.localeCompare(pb.letter);
}

export function sortKelasList(kelasList) {
  return [...new Set(kelasList)].sort(compareKelas);
}