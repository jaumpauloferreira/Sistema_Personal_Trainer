// src/Componentes/Navbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaUserPlus, FaDumbbell, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { token, signout } = useAuth();
  const navigate = useNavigate();

  if (!token) return null;

  const handleLogout = () => {
    signout();
    navigate('/login');
  };

  return (
    <div className="sidebar d-flex flex-column justify-content-between">
      <div>
        <div className="sidebar-header">
          <FaDumbbell size={24} className="me-2" />
          <h3>Personal Trainer</h3>
        </div>

        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link">
              <FaHome className="me-2" />
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/alunos" className="nav-link">
              <FaUser className="me-2" />
              Alunos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/alunos/novo" className="nav-link">
              <FaUserPlus className="me-2" />
              Novo Aluno
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Botão Sair com o mesmo estilo dos links */}
      <div className="logout-container">
        <button className="nav-link logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Navbar;
