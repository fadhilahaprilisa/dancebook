import axiosClient from './axiosClient';

export async function getStudents() {
  const response = await axiosClient.get('/students');
  return response.data.data;
}

export async function createStudent({ name, kelas }) {
  const response = await axiosClient.post('/students', { name, kelas });
  return response.data.data;
}

export async function updateStudent(id, { name, kelas }) {
  const response = await axiosClient.put(`/students/${id}`, { name, kelas });
  return response.data.data;
}

export async function updateStudentStatus(id, status) {
  const response = await axiosClient.patch(`/students/${id}/status`, { status });
  return response.data.data;
}

export async function deleteStudent(id) {
  await axiosClient.delete(`/students/${id}`);
}