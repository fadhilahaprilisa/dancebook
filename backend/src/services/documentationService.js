const cloudinary = require('../config/cloudinary');
const documentationModel = require('../models/documentationModel');
const ApiError = require('../utils/ApiError');

const UPLOAD_TIMEOUT_MS = 45000; // 45 detik

function uploadBufferToCloudinary(buffer, resourceType) {
  return new Promise((resolve, reject) => {
    let settled = false;

    // Tanpa batas waktu eksplisit di sini, jika koneksi ke Cloudinary macet
    // (kredensial belum diisi/salah, jaringan/firewall memblokir, DNS lambat,
    // dsb.), stream.upload_stream() bisa menggantung TANPA PERNAH memanggil
    // callback error maupun sukses. Karena Promise tidak pernah settle,
    // asyncHandler juga tidak pernah meneruskan error ke errorHandler,
    // sehingga tidak ada apa pun yang tercetak di terminal dan request
    // menggantung sampai akhirnya timeout di sisi klien/proxy. Timer di
    // bawah ini memaksa Promise untuk selalu selesai (gagal dengan jelas)
    // dalam waktu wajar, dan log eksplisit memastikan masalah selalu
    // terlihat di terminal backend.
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      console.error(
        `[Cloudinary] Upload timeout setelah ${UPLOAD_TIMEOUT_MS / 1000}s. ` +
        'Kemungkinan penyebab: CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET belum diisi ' +
        'atau salah, atau koneksi jaringan ke Cloudinary diblokir/lambat.'
      );
      reject(new ApiError(504, 'Upload ke Cloudinary timeout. Periksa koneksi internet dan kredensial Cloudinary di server.'));
    }, UPLOAD_TIMEOUT_MS);

    let stream;
    try {
      stream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType, folder: 'dancebook/documentations' },
        (error, result) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          if (error) {
            console.error('[Cloudinary] Upload gagal:', error.message || error);
            return reject(error);
          }
          resolve(result);
        }
      );
    } catch (err) {
      settled = true;
      clearTimeout(timer);
      console.error('[Cloudinary] Gagal memulai upload stream:', err.message || err);
      return reject(err);
    }

    stream.on('error', (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      console.error('[Cloudinary] Upload stream error:', err.message || err);
      reject(err);
    });

    stream.end(buffer);
  });
}

function toResponse(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    activityDate: row.activity_date,
    mediaType: row.media_type,
    mediaUrl: row.media_url,
  };
}

async function getDocumentations() {
  const rows = await documentationModel.findAll();
  return rows.map(toResponse);
}

async function createDocumentation({ title, description, activityDate }, file) {
  if (!file) throw new ApiError(400, 'File foto/video wajib diunggah');
  if (!title || !title.trim()) throw new ApiError(400, 'Judul kegiatan wajib diisi');
  if (!activityDate) throw new ApiError(400, 'Tanggal kegiatan wajib diisi');

  const isVideo = file.mimetype.startsWith('video');
  const uploadResult = await uploadBufferToCloudinary(file.buffer, isVideo ? 'video' : 'image');

  const doc = await documentationModel.create({
    title: title.trim(),
    description,
    activityDate,
    mediaType: isVideo ? 'video' : 'foto',
    mediaUrl: uploadResult.secure_url,
    cloudinaryPublicId: uploadResult.public_id,
  });

  return toResponse(doc);
}

async function deleteDocumentation(id) {
  const doc = await documentationModel.findById(id);
  if (!doc) throw new ApiError(404, 'Dokumentasi tidak ditemukan');

  const resourceType = doc.media_type === 'video' ? 'video' : 'image';
  await cloudinary.uploader.destroy(doc.cloudinary_public_id, { resource_type: resourceType });
  await documentationModel.remove(id);
}

module.exports = { getDocumentations, createDocumentation, deleteDocumentation };
