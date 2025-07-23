import axios from 'axios';

const API_URL = 'http://localhost:3000/fichas';

const criar = async (alunoId, ficha) => {
  const res = await axios.post(`${API_URL}/${alunoId}`, ficha);
  return res.data;
};

const listarPorAluno = async (alunoId) => {
  const res = await axios.get(`${API_URL}/aluno/${alunoId}`);
  return res.data;
};

// Objeto nomeado para exportação (melhor prática)
const fichaService = {
  criar,
  listarPorAluno
};

export default fichaService;
