// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Componentes/Home';
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';

import ListaAlunos from './Paginas/Alunos/ListaAlunos';
import CadastroAluno from './Paginas/Alunos/CadastroAluno';
import ListaAvaliacoes from './Paginas/Avaliacoes/ListaAvaliacoes';
import NovaAvaliacao from './Paginas/Avaliacoes/NovaAvaliacao';
import ListaFichas from './Paginas/Fichas/ListaFichas';
import NovaFicha from './Paginas/Fichas/NovaFicha';
import ListaExercicios from './Paginas/Exercicios/ListaExercicios';
import NovoExercicio from './Paginas/Exercicios/NovoExercicio';

function App() {
  return (
    <Router>
      <Navbar />

      {/* 
        marginLeft pra não ficar por baixo da sidebar,
        paddingBottom para dar espaço ao rodapé fixo 
      */}
      <div style={{ marginLeft: '230px', padding: '20px', paddingBottom: '60px' }}>
        <Routes>
          {/* Rota inicial para a Home */}
          <Route path="/" element={<Home />} />

          {/* Rotas principais */}
          <Route path="/alunos" element={<ListaAlunos />} />
          <Route path="/alunos/novo" element={<CadastroAluno />} />

          <Route path="/avaliacoes/:alunoId" element={<ListaAvaliacoes />} />
          <Route path="/avaliacoes/novo/:alunoId" element={<NovaAvaliacao />} />

          <Route path="/fichas/:alunoId" element={<ListaFichas />} />
          <Route path="/fichas/novo/:alunoId" element={<NovaFicha />} />

          <Route path="/exercicios/:fichaId" element={<ListaExercicios />} />
          <Route path="/exercicios/novo/:fichaId" element={<NovoExercicio />} />

          {/* Qualquer outra rota redireciona pra Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Rodapé fixo na parte de baixo */}
      <Footer />
    </Router>
  );
}

export default App;
