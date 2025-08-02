// src/Paginas/Avaliacoes/ListaAvaliacoes.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import avaliacaoService from '../../services/avaliacaoService';

function ListaAvaliacoes() {
  const { alunoId } = useParams();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
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

  const toggleSelecionada = (id) => {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExcluirSelecionadas = async () => {
    if (
      selecionadas.length > 0 &&
      window.confirm('Tem certeza que deseja excluir as avaliações selecionadas?')
    ) {
      try {
        for (const id of selecionadas) {
          await avaliacaoService.excluir(id);
        }
        setAvaliacoes(avaliacoes.filter((a) => !selecionadas.includes(a.id)));
        setSelecionadas([]);
      } catch (err) {
        console.error('Erro ao excluir avaliações:', err);
        alert('Erro ao excluir uma ou mais avaliações.');
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Título e botões */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Avaliações do Aluno</h2>
        <div className="d-flex gap-2">
          {selecionadas.length > 0 && (
            <button className="btn btn-danger" onClick={handleExcluirSelecionadas}>
              <i className="bi bi-trash me-1"></i> Excluir Selecionadas
            </button>
          )}
          <Link to={`/avaliacoes/novo/${alunoId}`} className="btn btn-success">
            + Nova Avaliação
          </Link>
        </div>
      </div>

      {erro && <div className="alert alert-danger">{erro}</div>}

      {avaliacoes.length === 0 ? (
        <div className="alert alert-info">Nenhuma avaliação encontrada.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead className="table-dark">
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
                <th className="text-center">
                  <i className="bi bi-trash" style={{ color: 'white' }}></i>
                </th>
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
                  <td className="text-center align-middle">
                    <input
                      type="checkbox"
                      checked={selecionadas.includes(av.id)}
                      onChange={() => toggleSelecionada(av.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListaAvaliacoes;
