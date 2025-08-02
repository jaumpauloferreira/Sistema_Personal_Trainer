// src/services/exercicioService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/exercicios';

// Recupera o token do localStorage e monta o header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Lista todos os exercícios de uma ficha
const listarPorFicha = async (fichaId) => {
  const res = await axios.get(`${API_URL}/ficha/${fichaId}`, getAuthHeader());
  return res.data;
};

// Cria um novo exercício
const criar = async (fichaId, dados) => {
  const res = await axios.post(`${API_URL}/novo/${fichaId}`, dados, getAuthHeader());
  return res.data;
};

// Exclui exercício por ID
const excluir = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return res.data;
};

const exercicioService = {
  listarPorFicha,
  criar,
  excluir
};

export default exercicioService;
