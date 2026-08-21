DanceBook
Aplikasi Web Administrasi Ekstrakurikuler Tari
React · Node.js · MySQL
<img width="1366" height="768" alt="Screenshot 2026-08-13 194626" src="https://github.com/user-attachments/assets/72a105d2-7b67-493e-82ac-32542193c8a3" />
DanceBook adalah solusi praktis untuk guru ekstrakurikuler tari dalam mengelola data murid, absensi, nilai rapor, dokumentasi, dan agenda latihan. Dibangun berdasarkan pengalaman nyata seorang guru tari, aplikasi ini dirancang agar mudah digunakan dan langsung menjawab kebutuhan administrasi harian.

Status: Pengembangan aktif, belum dideploy. Untuk mencoba, jalankan secara lokal (lihat panduan di bawah).

✨ Fitur Utama
Login Guru dengan opsi "Ingat saya di perangkat ini"

Dashboard Ringkasan – jumlah murid, dokumentasi, latihan, dan kehadiran bulan ini

Data Murid – kelola daftar murid per kelas, cari dan filter, serta arsipkan murid lulus/keluar

Absensi – catat kehadiran latihan (Hadir, Izin, Sakit, Alfa)

Nilai Rapor – pilih tahun dan murid, isi nilai serta checklist penilaian (kriteria khusus tari)

Dokumentasi – galeri foto dan video kegiatan, upload dokumentasi, hapus jika diperlukan

Agenda – jadwal latihan dan kegiatan

Download CSV – ekspor data murid/absensi

Backup Database – cadangkan data secara manual

🛠 Teknologi
Lapisan	Teknologi
Frontend	React (dengan state management)
Backend	Node.js + Express
Database	MySQL
Lainnya	CSS, Axios, JWT (untuk autentikasi)
📁 Struktur Proyek (Ringkas)
text
dancebook/
├── frontend/          # React app
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── ...
├── backend/           # Node.js + Express
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   └── ...
└── database/          # SQL schema & seed data
🚀 Panduan Instalasi & Menjalankan Lokal
Prasyarat
Node.js (v16 atau lebih baru)

MySQL (v8 atau lebih baru)

npm atau yarn

Langkah-langkah
Clone repositori

bash
git clone https://github.com/username/dancebook.git
cd dancebook
Setup Database

Buat database MySQL baru, misal dancebook.

Jalankan skema SQL yang ada di folder database/schema.sql (dan seed jika diperlukan).

Sesuaikan konfigurasi koneksi di backend/config/db.config.js.

Backend

bash
cd backend
npm install
npm run dev   # atau node server.js
Server akan berjalan di http://localhost:5000 (default).

Frontend

bash
cd frontend
npm install
npm start
Aplikasi React akan berjalan di http://localhost:3000.

Login

Gunakan akun guru yang telah dibuat (lihat seed data), atau daftar melalui endpoint register (belum ada UI pendaftaran, hanya untuk admin).

📸 Tampilan Layar
Cuplikan layar tersedia di folder screenshots/ repositori ini.

Login – halaman masuk sederhana
<img width="1366" height="768" alt="Screenshot 2026-08-13 194626" src="https://github.com/user-attachments/assets/16d8d6a9-c01a-4c27-9d90-5e6f8a5b4aef" />

Dashboard – ringkasan data
<img width="1366" height="768" alt="Screenshot 2026-08-13 194640" src="https://github.com/user-attachments/assets/7fef4f62-8f86-469c-91e6-5b22367048cf" />

Data Murid – daftar murid per kelas
<img width="1366" height="768" alt="Screenshot 2026-08-13 194729" src="https://github.com/user-attachments/assets/7fb08c8c-900b-4046-b43f-1ce1f56617b5" />

Nilai Rapor – input nilai dengan checklist kriteria tari
<img width="1366" height="768" alt="Screenshot 2026-08-13 194843" src="https://github.com/user-attachments/assets/d13e2135-e2f6-4dcd-a37c-2df3ef101a97" />

Dokumentasi – galeri dan upload
<img width="1366" height="768" alt="Screenshot 2026-08-13 195247" src="https://github.com/user-attachments/assets/15270933-a046-45ac-b881-7dbc2ad3e29d" />
<img width="1366" height="768" alt="Screenshot 2026-08-13 195256" src="https://github.com/user-attachments/assets/a32a644e-cd7d-488f-b943-776299b3e313" />

🤝 Kontribusi
Kontribusi sangat diterima! Silakan buat issue atau ajukan pull request. Untuk perubahan besar, diskusikan terlebih dahulu melalui issue.

📄 Lisensi
MIT – bebas digunakan dan dimodifikasi untuk keperluan pendidikan dan non-komersial.

🙏 Catatan
Aplikasi ini dikembangkan berdasarkan kebutuhan nyata guru tari Sekolah Dasar. Jika Anda memiliki saran atau menemukan bug, jangan ragu untuk menghubungi pengembang.

Selamat mengelola ekstrakurikuler tari dengan DanceBook! 💃
