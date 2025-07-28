// src/App.js
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './Paginas/Login';
import Home from './Componentes/Home'; // ✅ Importação da sua Home
import CadastroUsuario from './Paginas/CadastroUsuario';


import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';

import ListaAlunos     from './Paginas/Alunos/ListaAlunos';
import CadastroAluno   from './Paginas/Alunos/CadastroAluno';
import ListaAvaliacoes from './Paginas/Avaliacoes/ListaAvaliacoes';
import NovaAvaliacao   from './Paginas/Avaliacoes/NovaAvaliacao';
import ListaFichas     from './Paginas/Fichas/ListaFichas';
import NovaFicha       from './Paginas/Fichas/NovaFicha';
import ListaExercicios from './Paginas/Exercicios/ListaExercicios';
import NovoExercicio   from './Paginas/Exercicios/NovoExercicio';

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
      {token && !isLoginPage && <Navbar />}

      <div style={{
        marginLeft: token && !isLoginPage ? '230px' : 0,
        padding: '20px',
        paddingBottom: token && !isLoginPage ? '60px' : '20px'
      }}>
        <Routes>
          {/* Rota pública de login */}
          <Route path="/login" element={<Login />} />

          {/* ✅ Agora exibe a Home se estiver logado */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route path="/register" element={<CadastroUsuario />} />

          <Route path="/alunos" element={<PrivateRoute><ListaAlunos /></PrivateRoute>} />
          <Route path="/alunos/novo" element={<PrivateRoute><CadastroAluno /></PrivateRoute>} />
          <Route path="/avaliacoes/:alunoId" element={<PrivateRoute><ListaAvaliacoes /></PrivateRoute>} />
          <Route path="/avaliacoes/novo/:alunoId" element={<PrivateRoute><NovaAvaliacao /></PrivateRoute>} />
          <Route path="/fichas/:alunoId" element={<PrivateRoute><ListaFichas /></PrivateRoute>} />
          <Route path="/fichas/novo/:alunoId" element={<PrivateRoute><NovaFicha /></PrivateRoute>} />
          <Route path="/exercicios/:fichaId" element={<PrivateRoute><ListaExercicios /></PrivateRoute>} />
          <Route path="/exercicios/novo/:fichaId" element={<PrivateRoute><NovoExercicio /></PrivateRoute>} />

          {/* Rota fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {token && !isLoginPage && <Footer />}
    </>
  );
}
