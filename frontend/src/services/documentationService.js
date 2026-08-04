import axiosClient from './axiosClient';

export async function getDocumentations() {
  const response = await axiosClient.get('/documentations');
  return response.data.data;
}

export async function createDocumentation({ title, description, activityDate, file }) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description || '');
  formData.append('activityDate', activityDate);
  formData.append('file', file);

  const response = await axiosClient.post('/documentations', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    // Upload foto/video butuh waktu lebih lama dari request API biasa,
    // terutama untuk video atau koneksi lambat — beri jeda lebih longgar
    // daripada timeout default axiosClient (60s), tapi tetap dibatasi agar
    // tidak menggantung selamanya seperti sebelumnya.
    timeout: 90000,
  });
  return response.data.data;
}

export async function deleteDocumentation(id) {
  await axiosClient.delete(`/documentations/${id}`);
}