// src/services/authService.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',      // ajuste se precisar
});

// opcional: pegar token de localStorage e colocar no header
API.interceptors.request.use(config => {
  const token = localStorage.getItem('pt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function login({ email, senha }) {
  const { data } = await API.post('/auth/login', { email, senha });
  // data.token === seu JWT
  return data.token;
}

export async function register({ nome, email, senha }) {
  const { data } = await API.post('/auth/register', { nome, email, senha });
  return data;
}
