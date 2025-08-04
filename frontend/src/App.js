// src/App.js
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './Paginas/Login';
import Home from './Componentes/Home';
import CadastroUsuario from './Paginas/CadastroUsuario';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Componentes/Navbar';
import Topbar from './Componentes/Topbar';
import Footer from './Componentes/Footer';

import ListaAlunos from './Paginas/Alunos/ListaAlunos';
import CadastroAluno from './Paginas/Alunos/CadastroAluno';
import ListaAvaliacoes from './Paginas/Avaliacoes/ListaAvaliacoes';
import NovaAvaliacao from './Paginas/Avaliacoes/NovaAvaliacao';
import ListaFichas from './Paginas/Fichas/ListaFichas';
import NovaFicha from './Paginas/Fichas/NovaFicha';
import ListaExercicios from './Paginas/Exercicios/ListaExercicios';
import NovoExercicio from './Paginas/Exercicios/NovoExercicio';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { token } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {/* Sidebar */}
      {token && !isLoginPage && <Navbar />}

      {/* Topbar */}
      {token && !isLoginPage && <Topbar />}

      {/* Conteúdo da Página */}
      <div style={{
        marginLeft: token && !isLoginPage ? '200px' : 0,
        marginTop: token && !isLoginPage ? '0px' : 0,
        padding: '20px',
        paddingBottom: 0 // ✅ Removido espaço entre conteúdo e footer
      }}>
        <Routes>
          {/* Rota pública de login */}
          <Route path="/login" element={<Login />} />

          {/* Página inicial */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Cadastro de usuário */}
          <Route path="/register" element={<CadastroUsuario />} />

          {/* Alunos */}
          <Route path="/alunos" element={<PrivateRoute><ListaAlunos /></PrivateRoute>} />
          <Route path="/alunos/novo" element={<PrivateRoute><CadastroAluno /></PrivateRoute>} />
          <Route path="/alunos/editar/:id" element={<PrivateRoute><CadastroAluno /></PrivateRoute>} />

          {/* Avaliações */}
          <Route path="/avaliacoes/:alunoId" element={<PrivateRoute><ListaAvaliacoes /></PrivateRoute>} />
          <Route path="/avaliacoes/novo/:alunoId" element={<PrivateRoute><NovaAvaliacao /></PrivateRoute>} />

          {/* Fichas */}
          <Route path="/fichas/:alunoId" element={<PrivateRoute><ListaFichas /></PrivateRoute>} />
          <Route path="/fichas/novo/:alunoId" element={<PrivateRoute><NovaFicha /></PrivateRoute>} />

          {/* Exercícios */}
          <Route path="/exercicios/:fichaId" element={<PrivateRoute><ListaExercicios /></PrivateRoute>} />
          <Route path="/exercicios/novo/:fichaId" element={<PrivateRoute><NovoExercicio /></PrivateRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Rodapé */}
      {token && !isLoginPage && <Footer />}
    </>
  );
}