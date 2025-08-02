// src/Paginas/CadastroUsuario.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const [erro, setErro] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');

    if (form.senha !== form.confirmarSenha) {
      return setErro('As senhas não coincidem');
    }

    try {
      await register({
        nome: form.nome,
        email: form.email,
        senha: form.senha
      });
      alert('Usuário cadastrado com sucesso!');
      navigate('/login');
    } catch (err) {
      setErro(err?.response?.data?.error || 'Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Cadastro de Usuário</h2>

        {erro && <div className="alert alert-danger text-center">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              placeholder="Digite seu nome"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
              placeholder="Digite uma senha"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar Senha</label>
            <input
              type="password"
              className="form-control"
              name="confirmarSenha"
              value={form.confirmarSenha}
              onChange={handleChange}
              required
              placeholder="Confirme sua senha"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-underline" style={{ fontSize: '0.9rem' }}>
            Já possui conta? Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
