import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import exercicioService from '../../services/exercicioService';

const NovoExercicio = () => {
  const { fichaId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome_exercicio: '',
    series: '',
    repeticoes: '',
    carga: '',
    dia_semana: '',
    observacoes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await exercicioService.criar(fichaId, form);
      alert('Exercício cadastrado com sucesso!');
      navigate(`/exercicios/${fichaId}`);
    } catch (error) {
      console.error('Erro ao cadastrar exercício:', error);
      alert('Erro ao cadastrar exercício.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Novo Exercício</h2>
        <Link to={`/exercicios/${fichaId}`} className="btn btn-secondary">
          ← Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Nome do Exercício</label>
            <input
              name="nome_exercicio"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Séries</label>
            <input
              type="number"
              name="series"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Repetições</label>
            <input
              type="number"
              name="repeticoes"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Carga (kg)</label>
            <input
              type="number"
              name="carga"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Dia da Semana</label>
            <select
              name="dia_semana"
              className="form-select"
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Segunda">Segunda</option>
              <option value="Terça">Terça</option>
              <option value="Quarta">Quarta</option>
              <option value="Quinta">Quinta</option>
              <option value="Sexta">Sexta</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Observações</label>
            <textarea
              name="observacoes"
              className="form-control"
              rows="3"
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-primary px-4">
            Cadastrar Exercício
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovoExercicio;
