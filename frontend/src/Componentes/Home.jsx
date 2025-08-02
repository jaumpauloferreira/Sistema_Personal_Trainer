import React from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';
import '../Componentes/Home.css';

export default function Home() {
  return (
    <div className="hero vh-100 d-flex align-items-center justify-content-center">
      <div className="hero-overlay" />

      <div className="hero-content container text-center text-white position-relative">
        <div className="icon-wrapper mb-4">
          <FaDumbbell className="dumbbell-icon" />
        </div>
        <h1 className="display-4 fw-bold">
          Bem‑vindo ao <span className="text-highlight">Personal Trainer</span>
        </h1>
        <p className="lead mb-4">
          Gerencie seus alunos, avaliações, fichas de treino e exercícios com facilidade.
        </p>
        <Link to="/alunos" className="btn btn-light btn-lg rounded-pill px-5 shadow-sm">
          Ver Alunos
        </Link>
      </div>
    </div>
  );
}
