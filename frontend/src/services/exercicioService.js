import axios from 'axios';

const API_URL = 'http://localhost:3000/exercicios';

const listarPorFicha = async (fichaId) => {
  const res = await axios.get(`${API_URL}/ficha/${fichaId}`);
  return res.data;
};

const criar = async (fichaId, dados) => {
  const res = await axios.post(`${API_URL}/novo/${fichaId}`, dados);
  return res.data;
};

const exercicioService = {
  listarPorFicha,
  criar
};

export default exercicioService;

