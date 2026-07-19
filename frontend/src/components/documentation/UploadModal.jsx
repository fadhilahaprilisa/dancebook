import { useState } from 'react';
import { X, Upload, Image as ImageIcon, Video } from 'lucide-react';
import CalendarPicker from '../common/CalendarPicker';

function todayStr() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export default function UploadModal({ isOpen, onClose, onSubmit }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activityDate, setActivityDate] = useState(todayStr());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const type = selected.type.startsWith('video') ? 'video' : 'foto';
    setFile(selected);
    setMediaType(type);
    setPreviewUrl(URL.createObjectURL(selected));
    setError('');
  };

  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setMediaType(null);
    setTitle('');
    setDescription('');
    setActivityDate(todayStr());
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Pilih foto atau video terlebih dahulu.');
      return;
    }
    if (!title.trim()) {
      setError('Judul kegiatan wajib diisi.');
      return;
    }
    setIsSubmitting(true);
    await onSubmit({ title, description, activityDate, mediaType, mediaUrl: previewUrl });
    setIsSubmitting(false);
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/30" onClick={handleClose} />
      <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-on-surface">Unggah Dokumentasi</h2>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-primary/10 text-on-surface-variant"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* File Picker + Preview */}
          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Foto atau Video</label>
            {previewUrl ? (
              <div className="relative rounded-2xl overflow-hidden bg-surface-container-low">
                {mediaType === 'video' ? (
                  <video src={previewUrl} controls className="w-full max-h-56 object-contain bg-black" />
                ) : (
                  <img src={previewUrl} alt="Preview" className="w-full max-h-56 object-contain" />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreviewUrl(null);
                    setMediaType(null);
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-outline-variant rounded-2xl py-8 cursor-pointer hover:bg-primary/5 transition-colors">
                <Upload className="w-6 h-6 text-primary" />
                <span className="text-xs text-on-surface-variant">Klik untuk pilih foto atau video</span>
                <span className="text-[10px] text-on-surface-variant/70 flex items-center gap-2">
                  <ImageIcon className="w-3 h-3" /> Foto <Video className="w-3 h-3" /> Video
                </span>
                <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
              </label>
            )}
          </div>

          {/* Tanggal via Calendar Picker */}
          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Tanggal Kegiatan</label>
            <CalendarPicker selectedDate={activityDate} onSelectDate={setActivityDate} />
          </div>

          {/* Judul */}
          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Judul Kegiatan</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-base"
              placeholder="Contoh: Latihan Rutin Kelas 4"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="input-base resize-none"
              placeholder="Ceritakan sedikit tentang kegiatan ini..."
            />
          </div>

          {error && <p className="text-xs text-error">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 rounded-xl border border-outline-variant text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 btn-primary disabled:opacity-60">
              {isSubmitting ? 'Mengunggah...' : 'Unggah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}