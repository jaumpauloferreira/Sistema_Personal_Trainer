const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const alunoRoutes = require('./routers/aluno.routes');
const avaliacaoRoutes = require('./routers/avaliacao.routes');
const fichaRoutes = require('./routers/ficha.routes');
const exercicioRoutes = require('./routers/exercicio.routes');

app.use(express.json());
app.use(cors());

app.use('/alunos', alunoRoutes);
app.use('/avaliacoes', avaliacaoRoutes);
app.use('/fichas', fichaRoutes);
app.use('/exercicios', exercicioRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
