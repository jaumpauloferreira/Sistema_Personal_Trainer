// src/Paginas/Fichas/NovaFicha.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import fichaService from '../../services/fichaService';

const NovaFicha = () => {
  const { alunoId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    data_criacao: '',
    observacoes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fichaService.criar(alunoId, form);
      alert('Ficha cadastrada com sucesso!');
      navigate(`/fichas/${alunoId}`);
    } catch (error) {
      console.error('Erro ao cadastrar ficha:', error);
      alert('Erro ao cadastrar ficha.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Nova Ficha de Treino</h2>
        <Link to={`/fichas/${alunoId}`} className="btn btn-secondary">
          ← Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Título</label>
            <input
              type="text"
              name="titulo"
              className="form-control"
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Data de Criação</label>
            <input
              type="date"
              name="data_criacao"
              className="form-control"
              value={form.data_criacao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Observações</label>
            <textarea
              name="observacoes"
              className="form-control"
              rows="4"
              value={form.observacoes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-primary px-4">
            Cadastrar Ficha
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovaFicha;
