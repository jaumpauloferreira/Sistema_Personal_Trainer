// src/services/alunoService.js
import API from './api'; // importa o axios com interceptor

const listar = async () => {
  const res = await API.get('/alunos');
  return res.data;
};

const buscarPorId = async (id) => {
  const res = await API.get(`/alunos/${id}`);
  return res.data;
};

const criar = async (aluno) => {
  const formData = new FormData();
  Object.entries(aluno).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await API.post('/alunos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return res.data;
};

const atualizar = async (id, aluno) => {
  const formData = new FormData();
  Object.entries(aluno).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await API.put(`/alunos/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return res.data;
};

const excluir = async (id) => {
  const res = await API.delete(`/alunos/${id}`);
  return res.data;
};

const alunoService = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};

export default alunoService;
