import axiosClient from './axiosClient';

export async function getAttendanceByDate(dateStr) {
  const response = await axiosClient.get('/attendances', { params: { date: dateStr } });
  return response.data.data;
}

export async function saveAttendanceByDate(dateStr, attendanceMap) {
  const response = await axiosClient.put(`/attendances/${dateStr}`, { attendance: attendanceMap });
  return response.data.data;
}

export async function getAllAttendanceEntries() {
  const response = await axiosClient.get('/attendances/all');
  return response.data.data;
}

export async function getDatesWithAttendance() {
  const all = await getAllAttendanceEntries();
  return Object.keys(all).filter((date) => Object.keys(all[date] || {}).length > 0);
}