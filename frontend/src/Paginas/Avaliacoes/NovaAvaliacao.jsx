// src/Paginas/Avaliacoes/NovaAvaliacao.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import avaliacaoService from '../../services/avaliacaoService';

export default function NovaAvaliacao() {
  const { alunoId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    data_avaliacao: '',
    peso: '',
    braco_direito: '',
    braco_esquerdo: '',
    perna_direita: '',
    perna_esquerda: '',
    peitoral: '',
    abdomen: '',
    observacoes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await avaliacaoService.criar(alunoId, form);
      alert('Avaliação cadastrada com sucesso!');
      navigate(`/avaliacoes/${alunoId}`);
    } catch (error) {
      console.error('Erro ao cadastrar avaliação:', error);
      alert('Erro ao cadastrar avaliação.');
    }
  };

  return (
    <div className="container mt-4" style={{ marginLeft: '-5px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Nova Avaliação Física</h2>
        <Link to={`/avaliacoes/${alunoId}`} className="btn btn-secondary">
          ← Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">

          <div className="col-md-4">
            <label className="form-label">Data da Avaliação</label>
            <input
              type="date"
              name="data_avaliacao"
              className="form-control"
              value={form.data_avaliacao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Peso (kg)</label>
            <input
              type="number"
              name="peso"
              className="form-control"
              value={form.peso}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">IMC</label>
            <input
              type="text"
              className="form-control"
              value="Será calculado automaticamente"
              disabled
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Braço Direito (cm)</label>
            <input
              type="number"
              name="braco_direito"
              className="form-control"
              value={form.braco_direito}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Braço Esquerdo (cm)</label>
            <input
              type="number"
              name="braco_esquerdo"
              className="form-control"
              value={form.braco_esquerdo}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Perna Direita (cm)</label>
            <input
              type="number"
              name="perna_direita"
              className="form-control"
              value={form.perna_direita}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Perna Esquerda (cm)</label>
            <input
              type="number"
              name="perna_esquerda"
              className="form-control"
              value={form.perna_esquerda}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Peitoral (cm)</label>
            <input
              type="number"
              name="peitoral"
              className="form-control"
              value={form.peitoral}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Abdômen (cm)</label>
            <input
              type="number"
              name="abdomen"
              className="form-control"
              value={form.abdomen}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Observações</label>
            <textarea
              name="observacoes"
              className="form-control"
              rows="3"
              value={form.observacoes}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-primary px-4">
            Cadastrar Avaliação
          </button>
        </div>
      </form>
    </div>
  );
}
