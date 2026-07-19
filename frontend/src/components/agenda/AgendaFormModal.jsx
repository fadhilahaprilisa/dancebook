import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { ACTIVITY_TYPES } from '../../utils/agendaTypes';

export default function AgendaFormModal({ isOpen, initialData, defaultDate, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      activityType: ACTIVITY_TYPES[0].value,
      date: defaultDate,
      startTime: '',
      endTime: '',
      location: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialData?.title || '',
        activityType: initialData?.activityType || ACTIVITY_TYPES[0].value,
        date: initialData?.date || defaultDate,
        startTime: initialData?.startTime || '',
        endTime: initialData?.endTime || '',
        location: initialData?.location || '',
        description: initialData?.description || '',
      });
    }
  }, [isOpen, initialData, defaultDate, reset]);

  if (!isOpen) return null;

  const submitHandler = async (values) => {
    await onSubmit(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-on-surface">
            {initialData ? 'Edit Agenda' : 'Tambah Agenda'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-primary/10 text-on-surface-variant" aria-label="Tutup">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)} noValidate>
          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Judul Kegiatan</label>
            <input
              type="text"
              className="input-base"
              placeholder="Contoh: Latihan Rutin Kelas 4"
              {...register('title', { required: 'Judul wajib diisi' })}
            />
            {errors.title && <p className="mt-1 text-xs text-error">{errors.title.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Jenis Kegiatan</label>
            <select className="input-base" {...register('activityType', { required: true })}>
              {ACTIVITY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Tanggal</label>
            <input type="date" className="input-base" {...register('date', { required: 'Tanggal wajib diisi' })} />
            {errors.date && <p className="mt-1 text-xs text-error">{errors.date.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Jam Mulai (opsional)</label>
              <input type="time" className="input-base" {...register('startTime')} />
            </div>
            <div>
              <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Jam Selesai (opsional)</label>
              <input type="time" className="input-base" {...register('endTime')} />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Lokasi (opsional)</label>
            <input type="text" className="input-base" placeholder="Contoh: Aula Sekolah" {...register('location')} />
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Deskripsi (opsional)</label>
            <textarea rows={3} className="input-base resize-none" placeholder="Catatan tambahan..." {...register('description')} />
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