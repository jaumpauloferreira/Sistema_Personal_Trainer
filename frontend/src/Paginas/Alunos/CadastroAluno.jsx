import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import alunoService from '../../services/alunoService';

const CadastroAluno = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: '',
    data_nascimento: '',
    sexo: 'M',
    altura: '',
    peso: '',
    telefone: '',
    email: '',
    objetivo: '',
    data_inicio: ''
  });
  const [foto, setFoto] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (id) {
      async function carregarAluno() {
        try {
          setCarregando(true);
          const aluno = await alunoService.buscarPorId(id);
          setForm(aluno);
        } catch (error) {
          console.error('Erro ao carregar aluno:', error);
          alert('Erro ao carregar os dados do aluno.');
        } finally {
          setCarregando(false);
        }
      }
      carregarAluno();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await alunoService.atualizar(id, { ...form, foto });
        alert('Aluno atualizado com sucesso!');
      } else {
        await alunoService.criar({ ...form, foto });
        alert('Aluno cadastrado com sucesso!');
      }
      navigate('/alunos');
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      alert('Erro ao salvar aluno.');
    }
  };

  return (
    <div className="container mt-5" style={{ marginLeft: '-5px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{id ? 'Editar Aluno' : 'Cadastro de Aluno'}</h2>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>
      </div>

      {carregando ? (
        <p>Carregando dados...</p>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nome</label>
              <input type="text" className="form-control" name="nome" value={form.nome} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Data de Nascimento</label>
              <input type="date" className="form-control" name="data_nascimento" value={form.data_nascimento} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label className="form-label">Sexo</label>
              <select className="form-select" name="sexo" value={form.sexo} onChange={handleChange} required>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Altura (cm)</label>
              <input type="number" className="form-control" name="altura" value={form.altura} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label className="form-label">Peso (kg)</label>
              <input type="number" className="form-control" name="peso" value={form.peso} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Telefone</label>
              <input type="text" className="form-control" name="telefone" value={form.telefone} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="col-12">
              <label className="form-label">Objetivo</label>
              <input type="text" className="form-control" name="objetivo" value={form.objetivo} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Data de Início</label>
              <input type="date" className="form-control" name="data_inicio" value={form.data_inicio} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Foto do Aluno</label>
              <input type="file" className="form-control" name="foto" accept="image/*" onChange={handleFile} />
            </div>
          </div>

          <div className="mt-4 text-end">
            <button type="submit" className="btn btn-primary px-4">
              {id ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CadastroAluno;
