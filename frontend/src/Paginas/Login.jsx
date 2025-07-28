// src/Paginas/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import './login.css'; // crie estilos se quiser

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
      // redireciona para a listagem de alunos
      navigate('/alunos');
    } catch (err) {
      setErro(err.response?.data?.error || 'Falha ao logar');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {erro && <div className="login-error">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          E‑mail
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
      <p className="mt-3 text-center">
  Ainda não tem conta? <a href="/register">Cadastre-se</a>
</p>

    </div>
    
  );
}
