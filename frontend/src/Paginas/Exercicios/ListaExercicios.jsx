// src/Paginas/Exercicios/ListaExercicios.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import exercicioService from '../../services/exercicioService';

const ListaExercicios = () => {
  const { fichaId } = useParams();
  const [exercicios, setExercicios] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarExercicios = async () => {
      try {
        const data = await exercicioService.listarPorFicha(fichaId);
        setExercicios(data);
      } catch (err) {
        console.error('Erro ao buscar exercícios:', err);
        setErro('Erro ao buscar exercícios.');
      }
    };

    carregarExercicios();
  }, [fichaId]);

  const toggleSelecionada = (id) => {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExcluirSelecionadas = async () => {
    if (
      selecionadas.length > 0 &&
      window.confirm('Tem certeza que deseja excluir os exercícios selecionados?')
    ) {
      try {
        for (const id of selecionadas) {
          await exercicioService.excluir(id);
        }
        setExercicios(exercicios.filter((ex) => !selecionadas.includes(ex.id)));
        setSelecionadas([]);
      } catch (err) {
        console.error('Erro ao excluir exercícios:', err);
        alert('Erro ao excluir um ou mais exercícios.');
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Título e botões */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Exercícios da Ficha</h2>
        <div className="d-flex gap-2">
          {selecionadas.length > 0 && (
            <button className="btn btn-danger" onClick={handleExcluirSelecionadas}>
              <i className="bi bi-trash me-1"></i> Excluir Selecionados
            </button>
          )}
          <Link to={`/exercicios/novo/${fichaId}`} className="btn btn-primary">
            + Novo Exercício
          </Link>
        </div>
      </div>

      {erro && <div className="alert alert-danger">{erro}</div>}

      {exercicios.length === 0 ? (
        <div className="alert alert-warning">Nenhum exercício cadastrado.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Nome</th>
                <th>Séries</th>
                <th>Repetições</th>
                <th>Carga (kg)</th>
                <th>Dia</th>
                <th>Observações</th>
                <th className="text-center">
                  <i className="bi bi-trash" style={{ color: 'white' }}></i>
                </th>
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
                  <td className="text-center align-middle">
                    <input
                      type="checkbox"
                      checked={selecionadas.includes(ex.id)}
                      onChange={() => toggleSelecionada(ex.id)}
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
};

export default ListaExercicios;

