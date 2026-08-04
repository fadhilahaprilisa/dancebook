import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  // Sebelumnya tidak ada timeout sama sekali (default axios = 0, tunggu
  // selamanya). Ini membuat request yang macet (mis. upload ke Cloudinary
  // yang gagal terhubung) terasa "hang" tanpa pesan error yang jelas.
  // 60 detik cukup untuk seluruh request biasa; endpoint upload diberi
  // waktu lebih lama lewat override per-request di documentationService.js.
  timeout: 60000,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('dancebook_token') || sessionStorage.getItem('dancebook_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('dancebook_token');
      sessionStorage.removeItem('dancebook_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;