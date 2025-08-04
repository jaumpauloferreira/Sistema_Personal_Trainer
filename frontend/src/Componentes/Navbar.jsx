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
    <div
      className="sidebar d-flex flex-column justify-content-between"
      style={{
        width: '200px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#343a40',
        color: 'white',
        padding: '1rem',
      }}
    >
      <div>
        <div className="sidebar-header mb-4 text-center d-flex flex-column align-items-center">
  <FaDumbbell size={32} className="mb-2" />
  <h5 className="m-0">Personal Trainer</h5>
</div>


        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link text-white">
              <FaHome className="me-2" />
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/alunos" className="nav-link text-white">
              <FaUser className="me-2" />
              Alunos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/alunos/novo" className="nav-link text-white">
              <FaUserPlus className="me-2" />
              Novo Aluno
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="logout-container">
        <button className="nav-link text-white" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Navbar;
