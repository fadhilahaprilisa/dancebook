const cloudinary = require('../config/cloudinary');
const documentationModel = require('../models/documentationModel');
const ApiError = require('../utils/ApiError');

function uploadBufferToCloudinary(buffer, resourceType) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType, folder: 'dancebook/documentations' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
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
