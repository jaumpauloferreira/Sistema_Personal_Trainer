import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
      // Redireciona para a lista de exercícios da ficha
      navigate(`/exercicios/${fichaId}`);
    } catch (error) {
      console.error('Erro ao cadastrar exercício:', error);
      alert('Erro ao cadastrar exercício.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Novo Exercício</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome do exercício:<br />
          <input name="nome_exercicio" onChange={handleChange} required />
        </label><br /><br />

        <label>Séries:<br />
          <input type="number" name="series" onChange={handleChange} required />
        </label><br /><br />

        <label>Repetições:<br />
          <input type="number" name="repeticoes" onChange={handleChange} required />
        </label><br /><br />

        <label>Carga (kg):<br />
          <input type="number" name="carga" onChange={handleChange} />
        </label><br /><br />

        <label>Dia da semana:<br />
          <select name="dia_semana" onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="Segunda">Segunda</option>
            <option value="Terça">Terça</option>
            <option value="Quarta">Quarta</option>
            <option value="Quinta">Quinta</option>
            <option value="Sexta">Sexta</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
        </label><br /><br />

        <label>Observações:<br />
          <textarea name="observacoes" onChange={handleChange} />
        </label><br /><br />

        <button type="submit">Cadastrar Exercício</button>
      </form>
    </div>
  );
};

export default NovoExercicio;
