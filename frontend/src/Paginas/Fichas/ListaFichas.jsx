import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fichaService from '../../services/fichaService';

const ListaFichas = () => {
  const { alunoId } = useParams();
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await fichaService.listarPorAluno(alunoId);
        setFichas(data);
      } catch (err) {
        console.error('Erro ao buscar fichas:', err);
        setFichas([]);
      }
    };
    carregar();
  }, [alunoId]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Fichas do Aluno {alunoId}</h2>

      <Link to={`/fichas/novo/${alunoId}`}>
        <button>+ Nova Ficha</button>
      </Link>

      {fichas.length === 0 ? (
        <p style={{ marginTop: '1rem' }}>Nenhuma ficha cadastrada.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Data</th>
              <th>Observações</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fichas.map((ficha) => (
              <tr key={ficha.id}>
                <td>{ficha.titulo}</td>
                <td>{new Date(ficha.data_criacao).toLocaleDateString()}</td>
                <td>{ficha.observacoes || '-'}</td>
                <td>{ficha.arquivada ? 'Arquivada' : 'Ativa'}</td>
                <td>
                  <Link to={`/exercicios/${ficha.id}`}>
                    <button>Ver Exercícios</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaFichas;

