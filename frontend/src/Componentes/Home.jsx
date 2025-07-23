import React from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';
import '../Componentes/Home.css';  // ou './Home.css' se você mover o CSS para src/Paginas/

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-overlay" />

      <div className="hero-content container text-center text-white">
        <div className="icon-wrapper mb-4">
          <FaDumbbell className="dumbbell-icon" />
        </div>
        <h1 className="display-4 fw-bold">
          Bem‑vindo ao Personal Trainer
        </h1>
        <p className="lead mb-4">
          Gerencie seus alunos, avaliações, fichas de treino e exercícios com facilidade.
        </p>
        <Link to="/alunos" className="btn btn-light btn-lg rounded-pill px-4">
          Ver Alunos
        </Link>
      </div>
    </div>
  );
}
