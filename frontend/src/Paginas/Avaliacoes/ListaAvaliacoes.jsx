import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import avaliacaoService from '../../services/avaliacaoService';

function ListaAvaliacoes() {
  const { alunoId } = useParams();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarAvaliacoes() {
      try {
        const dados = await avaliacaoService.listarPorAluno(alunoId);

        if (Array.isArray(dados)) {
          setAvaliacoes(dados);
        } else {
          console.error('Resposta não é um array:', dados);
          setAvaliacoes([]);
        }

      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        setErro('Erro ao buscar avaliações.');
      }
    }

    carregarAvaliacoes();
  }, [alunoId]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Avaliações do Aluno</h2>

      {/* ✅ Botão para cadastrar nova avaliação */}
      <Link to={`/avaliacoes/novo/${alunoId}`}>
        <button>+ Nova Avaliação</button>
      </Link>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {avaliacoes.length === 0 ? (
        <p style={{ marginTop: '1rem' }}>Nenhuma avaliação encontrada.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Peso</th>
              <th>IMC</th>
              <th>Peitoral</th>
              <th>Abdômen</th>
              <th>Braço Dir.</th>
              <th>Braço Esq.</th>
              <th>Perna Dir.</th>
              <th>Perna Esq.</th>
            </tr>
          </thead>
          <tbody>
            {avaliacoes.map((av) => (
              <tr key={av.id}>
                <td>{new Date(av.data_avaliacao).toLocaleDateString()}</td>
                <td>{av.peso}</td>
                <td>{av.imc}</td>
                <td>{av.peitoral}</td>
                <td>{av.abdomen}</td>
                <td>{av.braco_direito}</td>
                <td>{av.braco_esquerdo}</td>
                <td>{av.perna_direita}</td>
                <td>{av.perna_esquerda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaAvaliacoes;
