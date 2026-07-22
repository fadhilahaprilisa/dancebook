import axiosClient from './axiosClient';

export async function getAgendas() {
  const response = await axiosClient.get('/agendas');
  return response.data.data;
}

export async function createAgenda(values) {
  const response = await axiosClient.post('/agendas', values);
  return response.data.data;
}

export async function updateAgenda(id, values) {
  const response = await axiosClient.put(`/agendas/${id}`, values);
  return response.data.data;
}

export async function deleteAgenda(id) {
  await axiosClient.delete(`/agendas/${id}`);
}