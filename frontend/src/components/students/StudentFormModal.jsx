import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

export default function StudentFormModal({ isOpen, initialData, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', kelas: '' },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: initialData?.name || '',
        kelas: initialData?.kelas || '',
      });
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const submitHandler = async (values) => {
    await onSubmit(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-on-surface">
            {initialData ? 'Edit Data Murid' : 'Tambah Murid'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-primary/10 text-on-surface-variant"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)} noValidate>
          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">
              Nama Murid
            </label>
            <input
              type="text"
              className="input-base"
              placeholder="Masukkan nama lengkap"
              {...register('name', { required: 'Nama wajib diisi' })}
            />
            {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">
              Kelas
            </label>
            <input
              type="text"
              className="input-base"
              placeholder="Contoh: 1A, 2, 4B, 6"
              {...register('kelas', {
                required: 'Kelas wajib diisi',
                pattern: {
                  value: /^[1-6][A-Za-z]?$/,
                  message: 'Format kelas tidak valid (contoh: 1, 1A, 4B)',
                },
              })}
            />
            {errors.kelas && <p className="mt-1 text-xs text-error">{errors.kelas.message}</p>}
            <p className="mt-1 text-[11px] text-on-surface-variant">
              Boleh angka saja (1–6) atau angka + huruf (mis. 1A, 4B) — bebas sesuai penamaan kelas di sekolah Anda.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-outline-variant text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 btn-primary disabled:opacity-60">
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}