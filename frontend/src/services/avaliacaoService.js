// src/services/avaliacaoService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/avaliacoes';

const listarPorAluno = async (alunoId) => {
  const res = await axios.get(`${API_URL}/aluno/${alunoId}`);
  return res.data;
};

const criar = async (alunoId, avaliacao) => {
  const res = await axios.post(`${API_URL}/novo/${alunoId}`, avaliacao); // <- ATENÇÃO AQUI
  return res.data;
};

const avaliacaoService = {
  listarPorAluno,
  criar
};

export default avaliacaoService;
