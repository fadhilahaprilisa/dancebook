import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';
import { login, isAuthenticated } from '../services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '', remember: true },
  });

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await login(values);
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: err.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.',
        confirmButtonColor: '#E91E63',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 md:p-10 overflow-hidden bg-background">
      <div className="absolute w-96 h-96 rounded-full bg-primary-fixed blur-3xl opacity-50 -top-24 -left-16 pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full bg-secondary-fixed blur-3xl opacity-50 -bottom-24 -right-10 pointer-events-none" />

      <main className="w-full max-w-[440px] z-10">
        <div className="glass-card rounded-[32px] p-8 md:p-12">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <Sparkles className="text-primary w-9 h-9" />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-primary text-center tracking-tight">
              DanceBook
            </h1>
            <p className="text-sm font-medium text-on-surface-variant opacity-70 mt-1">
              Administrasi Ekstrakurikuler Tari
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Email"
                  autoComplete="username"
                  className="w-full h-14 pl-12 pr-4 bg-white/60 border border-outline-variant rounded-xl text-sm text-on-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  {...register('email', {
                    required: 'Email wajib diisi',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Format email tidak valid',
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-error font-medium">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full h-14 pl-12 pr-12 bg-white/60 border border-outline-variant rounded-xl text-sm text-on-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  {...register('password', { required: 'Password wajib diisi' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-error font-medium">{errors.password.message}</p>
              )}
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-primary"
                {...register('remember')}
              />
              <span className="text-sm text-on-surface-variant">Ingat saya di perangkat ini</span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[52px] bg-primary text-on-primary rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              <span>{isSubmitting ? 'Memproses...' : 'Login'}</span>
              {!isSubmitting && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}