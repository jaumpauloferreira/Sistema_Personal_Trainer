import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    <div style={{ padding: '2rem' }}>
      <h2>Nova Ficha de Treino</h2>
      <form onSubmit={handleSubmit}>
        <label>Título:<br />
          <input name="titulo" onChange={handleChange} required />
        </label><br /><br />

        <label>Data de Criação:<br />
          <input type="date" name="data_criacao" onChange={handleChange} required />
        </label><br /><br />

        <label>Observações:<br />
          <textarea name="observacoes" onChange={handleChange} />
        </label><br /><br />

        <button type="submit">Cadastrar Ficha</button>
      </form>
    </div>
  );
};

export default NovaFicha;