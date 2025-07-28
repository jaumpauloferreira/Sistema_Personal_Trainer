// src/Paginas/CadastroUsuario.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Cadastro de Usuário</h2>

      {erro && <div className="alert alert-danger">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nome</label>
          <input type="text" className="form-control" name="nome" value={form.nome} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Senha</label>
          <input type="password" className="form-control" name="senha" value={form.senha} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Confirmar Senha</label>
          <input type="password" className="form-control" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
      </form>
    </div>
  );
}
