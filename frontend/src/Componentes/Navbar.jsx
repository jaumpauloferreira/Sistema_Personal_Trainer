// src/Componentes/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaUserPlus, FaDumbbell } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FaDumbbell size={24} className="me-2" />
        <h3>Personal Trainer</h3>
      </div>

      <ul className="nav flex-column">
        {/* Link Home */}
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <FaHome className="me-2" />
            Home
          </NavLink>
        </li>

        {/* Lista de Alunos */}
        <li className="nav-item">
          <NavLink to="/alunos" className="nav-link">
            <FaUser className="me-2" />
            Alunos
          </NavLink>
        </li>

        {/* Novo Aluno */}
        <li className="nav-item">
          <NavLink to="/alunos/novo" className="nav-link">
            <FaUserPlus className="me-2" />
            Novo Aluno
          </NavLink>
        </li>

        {/* Você pode adicionar Avaliações e Fichas se quiser */}
        {/* 
        <li className="nav-item">
          <NavLink to="/avaliacoes" className="nav-link">
            <FaClipboardList className="me-2" />
            Avaliações
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/fichas" className="nav-link">
            <FaClipboardList className="me-2" />
            Fichas
          </NavLink>
        </li>
        */}
      </ul>
    </div>
  );
};

export default Navbar;
