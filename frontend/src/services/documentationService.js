// PENYIMPANAN SEMENTARA (in-memory, hilang saat refresh browser).
// TODO (Tahap 10): ganti dengan upload nyata ke Cloudinary (multipart/form-data
// ke POST /api/documentations) dan simpan metadata ke tabel `documentations`.
// File media (foto/video) sengaja TIDAK disimpan ke localStorage karena
// ukurannya bisa besar dan localStorage hanya cocok untuk data kecil.
let documentations = [];

export async function getDocumentations() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...documentations].sort((a, b) => (a.activityDate < b.activityDate ? 1 : -1));
}

export async function createDocumentation({ title, description, activityDate, mediaType, mediaUrl }) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newDoc = {
    id: `d-${Date.now()}`,
    title: title.trim(),
    description: description?.trim() || '',
    activityDate,
    mediaType,
    mediaUrl,
  };
  documentations = [newDoc, ...documentations];
  return newDoc;
}

export async function deleteDocumentation(id) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  documentations = documentations.filter((d) => d.id !== id);
}