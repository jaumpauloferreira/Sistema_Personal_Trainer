import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import exercicioService from '../../services/exercicioService';

const ListaExercicios = () => {
  const { fichaId } = useParams();
  const [exercicios, setExercicios] = useState([]);

useEffect(() => {
  const buscarExercicios = async () => {
    try {
      const data = await exercicioService.listarPorFicha(fichaId); // ✔ importante
      setExercicios(data);
    } catch (err) {
      console.error('Erro ao buscar exercícios:', err);
    }
  };
  buscarExercicios();
}, [fichaId]);


  return (
    <div style={{ padding: '2rem' }}>
      <h2>Exercícios da Ficha</h2>
      <Link to={`/exercicios/novo/${fichaId}`}>
        <button>+ Novo Exercício</button>
      </Link>

      {exercicios.length === 0 ? (
        <p>Nenhum exercício cadastrado.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Séries</th>
              <th>Repetições</th>
              <th>Carga (kg)</th>
              <th>Dia</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            {exercicios.map((ex) => (
              <tr key={ex.id}>
                <td>{ex.nome_exercicio}</td>
                <td>{ex.series}</td>
                <td>{ex.repeticoes}</td>
                <td>{ex.carga ?? '-'}</td>
                <td>{ex.dia_semana}</td>
                <td>{ex.observacoes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaExercicios;