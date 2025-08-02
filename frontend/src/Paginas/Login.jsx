// src/Paginas/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');
    try {
      const token = await loginService({ email, senha });
      signin(token);
      navigate('/alunos');
    } catch (err) {
      setErro(err.response?.data?.error || 'Falha ao logar');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {erro && <div className="alert alert-danger text-center">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">E‑mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Digite seu e‑mail"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>

        <p className="mt-3 text-center">
          Ainda não tem conta? <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
