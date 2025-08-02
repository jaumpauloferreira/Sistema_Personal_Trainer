// backend/server.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const authRoutes      = require('./routers/auth.routes');
const authMiddleware  = require('./middlewares/auth.middleware');
const alunoRoutes     = require('./routers/aluno.routes');
const avaliacaoRoutes = require('./routers/avaliacao.routes');
const fichaRoutes     = require('./routers/ficha.routes');
const exercicioRoutes = require('./routers/exercicio.routes');

const app = express();
app.use(express.json());
app.use(cors());

// Rota raiz (health check)
app.get('/', (req, res) => res.send('API Personal Trainer OK!'));

// Rotas públicas de autenticação
app.use('/auth', authRoutes);

// Rotas protegidas
app.use('/alunos', authMiddleware, alunoRoutes);
app.use('/avaliacoes',  avaliacaoRoutes);
app.use('/fichas',      fichaRoutes);
app.use('/exercicios',  exercicioRoutes);

// ✅ Servir fotos de alunos (acesso via /fotos/nome.jpg)
app.use('/fotos', express.static(path.join(__dirname, 'uploads/fotos')));

// (Opcional: manter o caminho completo para outras pastas, se quiser)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 404 para endpoints não mapeados
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Error‑handler genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
