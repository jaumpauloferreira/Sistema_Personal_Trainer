const express = require('express');
const router = express.Router();
const controller = require('../controller/avaliacao.controller');

// Rotas para avaliações físicas
router.post('/novo/:alunoId', controller.criarAvaliacao);
router.get('/aluno/:aluno_id', controller.listarAvaliacoes); 

module.exports = router;




