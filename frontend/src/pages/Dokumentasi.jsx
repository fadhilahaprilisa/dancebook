import { useEffect, useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Swal from 'sweetalert2';
import UploadModal from '../components/documentation/UploadModal';
import MediaGrid from '../components/documentation/MediaGrid';
import MediaLightbox from '../components/documentation/MediaLightbox';
import { getDocumentations, createDocumentation, deleteDocumentation } from '../services/documentationService';

export default function DokumentasiPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('foto'); // 'foto' | 'video'
  const [search, setSearch] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const loadItems = async () => {
    setIsLoading(true);
    const data = await getDocumentations();
    setItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesTab = item.mediaType === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [items, activeTab, search]);

  const handleUpload = async (values) => {
    await createDocumentation(values);
    await loadItems();
    Swal.fire({ icon: 'success', title: 'Dokumentasi Tersimpan', timer: 1300, showConfirmButton: false });
  };

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: `Hapus "${item.title}"?`,
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#E91E63',
    });
    if (result.isConfirmed) {
      await deleteDocumentation(item.id);
      setActiveItem(null);
      await loadItems();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Dokumentasi</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Galeri foto dan video kegiatan ekstrakurikuler tari.
          </p>
        </div>
        <button onClick={() => setIsUploadOpen(true)} className="btn-primary flex items-center gap-2 self-start md:self-auto">
          <Plus className="w-4 h-4" /> Unggah Dokumentasi
        </button>
      </div>

      <div className="flex gap-2 bg-surface-container-low w-fit p-1 rounded-full">
        <button
          onClick={() => setActiveTab('foto')}
          className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
            activeTab === 'foto' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Galeri Foto
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
            activeTab === 'video' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Galeri Video
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
        <input
          type="text"
          placeholder="Cari judul kegiatan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-base pl-11"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-surface-container-highest rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <MediaGrid items={filteredItems} onOpen={setActiveItem} />
      )}

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onSubmit={handleUpload} />
      <MediaLightbox item={activeItem} onClose={() => setActiveItem(null)} onDelete={handleDelete} />
    </div>
  );
}