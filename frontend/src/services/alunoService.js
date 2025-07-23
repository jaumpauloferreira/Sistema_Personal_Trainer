import axios from 'axios';

const API_URL = 'http://localhost:3000/alunos';

const listar = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const criar = async (aluno) => {
  // Monta o FormData para suportar multipart/form-data
  const formData = new FormData();
  Object.entries(aluno).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return res.data;
};

const alunoService = {
  listar,
  criar
};

export default alunoService;
