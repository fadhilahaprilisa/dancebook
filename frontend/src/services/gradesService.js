import axiosClient from './axiosClient';

export async function getGradeYears() {
  const response = await axiosClient.get('/grades/years');
  return response.data.data;
}

export async function getGradesByYear(year) {
  const response = await axiosClient.get('/grades', { params: { year } });
  return response.data.data;
}

export async function getStudentGradeHistory(studentId) {
  const response = await axiosClient.get(`/grades/history/${studentId}`);
  return response.data.data;
}

export async function saveStudentGrade(year, studentId, { grade, checklist }) {
  const response = await axiosClient.put(`/grades/${year}/${studentId}`, { grade, checklist });
  return response.data.data;
}

export async function getAllGradeEntries() {
  const response = await axiosClient.get('/grades/all');
  return response.data.data;
}