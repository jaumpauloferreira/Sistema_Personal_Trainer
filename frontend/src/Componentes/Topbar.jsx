// src/Componentes/Topbar.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Topbar = () => {
  const { usuario } = useAuth();

  return (
    <div
      className="topbar d-flex justify-content-end align-items-center px-4 shadow-sm"
      style={{
        position: 'fixed',
        top: -5,
        left: '200px', // largura da sidebar
        height: '45px',
        right: 0,
        backgroundColor: '#f8f9fa',
        zIndex: 1000,
      }}
    >
      {usuario?.nome && (
        <span className="text-dark small">Olá, {usuario.nome.split(' ')[0]}</span>
      )}
    </div>
  );
};

export default Topbar;
