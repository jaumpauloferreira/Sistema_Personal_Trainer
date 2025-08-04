import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import alunoService from '../../services/alunoService';

function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [selecionados, setSelecionados] = useState([]);

  const fetchAlunos = async () => {
    try {
      const dados = await alunoService.listar();
      setAlunos(dados);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const toggleSelecionado = (id) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExcluirSelecionados = async () => {
    if (
      selecionados.length > 0 &&
      window.confirm('Tem certeza que deseja excluir os alunos selecionados?')
    ) {
      try {
        for (const id of selecionados) {
          await alunoService.excluir(id);
        }
        setAlunos(alunos.filter((aluno) => !selecionados.includes(aluno.id)));
        setSelecionados([]);
      } catch (err) {
        console.error('Erro ao excluir alunos:', err);
        alert('Erro ao excluir um ou mais alunos.');
      }
    }
  };

  return (
    <div className="container mt-5">
      {/* Título e botões */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Lista de Alunos</h2>
        <div className="d-flex gap-2">
          {selecionados.length > 0 && (
            <button className="btn btn-danger" onClick={handleExcluirSelecionados}>
              <i className="bi bi-trash me-1"></i> Excluir Selecionados
            </button>
          )}
          <Link to="/alunos/novo" className="btn btn-outline-success">
            <i className="bi bi-person-plus-fill me-2"></i>
            Cadastrar Novo Aluno
          </Link>
        </div>
      </div>

      {/* Campo de busca */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Buscar por nome do aluno..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      {/* Tabela */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Objetivo</th>
              <th className="text-center">Ações</th>
              <th className="text-center">
                <i className="bi bi-trash" style={{ color: 'white' }}></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  Nenhum aluno encontrado com esse nome.
                </td>
              </tr>
            ) : (
              alunosFiltrados.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.email}</td>
                  <td>{aluno.telefone}</td>
                  <td>{aluno.objetivo}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/avaliacoes/${aluno.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="bi bi-clipboard-check me-1"></i>
                        Avaliação
                      </Link>
                      <Link
                        to={`/fichas/${aluno.id}`}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        <i className="bi bi-journal-text me-1"></i>
                        Ficha
                      </Link>
                      <Link
                        to={`/alunos/editar/${aluno.id}`}
                        className="btn btn-outline-warning btn-sm"
                      >
                        <i className="bi bi-pencil-square me-1"></i>
                        Editar
                      </Link>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <input
                      type="checkbox"
                      checked={selecionados.includes(aluno.id)}
                      onChange={() => toggleSelecionado(aluno.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaAlunos;
