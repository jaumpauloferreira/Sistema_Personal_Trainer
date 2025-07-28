import API from './api'; // importa o axios com interceptor

const listar = async () => {
  const res = await API.get('/alunos');
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

const alunoService = {
  listar,
  criar
};

export default alunoService;
