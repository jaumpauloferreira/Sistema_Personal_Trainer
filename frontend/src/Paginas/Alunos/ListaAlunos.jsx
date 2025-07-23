import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import alunoService from '../../services/alunoService';

function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function fetchAlunos() {
      const dados = await alunoService.listar();
      setAlunos(dados);
    }

    fetchAlunos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Alunos</h2>
      <Link to="/alunos/novo" className="btn btn-success mb-3">Cadastrar Novo Aluno</Link>

      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Objetivo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.telefone}</td>
              <td>{aluno.objetivo}</td>
              <td>
                <Link to={`/avaliacoes/${aluno.id}`} className="btn btn-primary btn-sm me-2">
                  Avaliação
                </Link>
                <Link to={`/fichas/${aluno.id}`} className="btn btn-secondary btn-sm">
                  Ficha
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAlunos;

