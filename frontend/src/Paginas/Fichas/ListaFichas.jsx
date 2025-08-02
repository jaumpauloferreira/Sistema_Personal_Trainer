import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fichaService from '../../services/fichaService';
import alunoService from '../../services/alunoService';

const ListaFichas = () => {
  const { alunoId } = useParams();
  const [fichas, setFichas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const dadosAluno = await alunoService.buscarPorId(alunoId);
        setAluno(dadosAluno);

        const data = await fichaService.listarPorAluno(alunoId);
        setFichas(data);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setFichas([]);
      }
    };
    carregar();
  }, [alunoId]);

  const toggleSelecionada = (id) => {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExcluirSelecionadas = async () => {
    if (
      selecionadas.length > 0 &&
      window.confirm('Tem certeza que deseja excluir as fichas selecionadas?')
    ) {
      try {
        for (const id of selecionadas) {
          await fichaService.excluir(id);
        }
        setFichas(fichas.filter((f) => !selecionadas.includes(f.id)));
        setSelecionadas([]);
      } catch (err) {
        console.error('Erro ao excluir fichas:', err);
        alert('Erro ao excluir uma ou mais fichas.');
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Foto e dados do aluno */}
      {aluno && (
        <div className="d-flex align-items-center mb-4">
          {aluno.foto_path && (
            <img
              src={`http://localhost:3000/fotos/${aluno.foto_path.split('/').pop()}`}
              alt={aluno.nome}
              className="rounded-circle me-3"
              width={80}
              height={80}
              style={{ objectFit: 'cover', border: '2px solid #ccc' }}
            />
          )}
          <div>
            <h4 className="mb-0">{aluno.nome}</h4>
            <small className="text-muted">{aluno.email}</small>
          </div>
        </div>
      )}

      {/* Cabeçalho com título e botões */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Fichas do Aluno</h2>
        <div className="d-flex gap-2">
          {selecionadas.length > 0 && (
            <button className="btn btn-danger" onClick={handleExcluirSelecionadas}>
              <i className="bi bi-trash me-1"></i> Excluir Selecionadas
            </button>
          )}
          <Link to={`/fichas/novo/${alunoId}`} className="btn btn-primary">
            + Nova Ficha
          </Link>
        </div>
      </div>

      {/* Lista de fichas */}
      {fichas.length === 0 ? (
        <p className="alert alert-info">Nenhuma ficha cadastrada.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Título</th>
                <th>Data</th>
                <th>Observações</th>
                <th>Status</th>
                <th className="text-center">Ações</th>
                <th className="text-center">
                  <i className="bi bi-trash" style={{ color: 'white' }}></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {fichas.map((ficha) => (
                <tr key={ficha.id}>
                  <td>{ficha.titulo}</td>
                  <td>{new Date(ficha.data_criacao).toLocaleDateString()}</td>
                  <td>{ficha.observacoes || '-'}</td>
                  <td>{ficha.arquivada ? 'Arquivada' : 'Ativa'}</td>
                  <td className="text-center">
                    <Link
                      to={`/exercicios/${ficha.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="bi bi-list-ul me-1"></i>
                      Ver Exercícios
                    </Link>
                  </td>
                  <td className="text-center align-middle">
                    <input
                      type="checkbox"
                      checked={selecionadas.includes(ficha.id)}
                      onChange={() => toggleSelecionada(ficha.id)}
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

export default ListaFichas;
