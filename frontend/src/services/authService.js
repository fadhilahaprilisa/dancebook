import axiosClient from './axiosClient';

const TOKEN_KEY = 'dancebook_token';

export async function login({ email, password, remember }) {
  const response = await axiosClient.post('/auth/login', { email, password });
  const { token } = response.data.data;

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);

  return response.data.data;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

// Mengecek keberadaan TOKEN saja tidak cukup: token bisa saja kedaluwarsa,
// atau ditandatangani dengan JWT_SECRET lama (mis. setelah .env diganti).
// Fungsi ini membaca payload JWT (tanpa perlu verifikasi signature di
// frontend) dan mengecek klaim "exp" agar token basi tidak membuat
// LoginPage/RequireAuth mengira pengguna masih login.
function isTokenExpired(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch (err) {
    // Token tidak bisa di-decode sama sekali -> anggap tidak valid
    return true;
  }
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  if (isTokenExpired(token)) {
    logout();
    return false;
  }

  return true;
}
