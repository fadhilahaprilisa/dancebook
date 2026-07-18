const TOKEN_KEY = 'dancebook_token';
const REMEMBER_KEY = 'dancebook_remember';

// TODO (Tahap 10): ganti implementasi mock ini dengan pemanggilan nyata
// ke POST /api/auth/login (axiosClient) setelah backend JWT terhubung.
export async function login({ email, password, remember }) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!email || !password) {
    throw new Error('Email dan password wajib diisi.');
  }

  const fakeToken = `mock.${btoa(email)}.token`;
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, fakeToken);

  if (remember) {
    localStorage.setItem(REMEMBER_KEY, 'true');
  } else {
    localStorage.removeItem(REMEMBER_KEY);
  }

  return { token: fakeToken, email };
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REMEMBER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}