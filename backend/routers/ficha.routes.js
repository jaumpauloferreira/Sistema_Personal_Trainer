const express = require('express');
const router = express.Router();
const controller = require('../controller/ficha.controller');

// Criar ficha para um aluno
router.post('/:alunoId', controller.criarFicha);
// Listar fichas de um aluno
router.get('/aluno/:aluno_id', controller.listarFichasPorAluno);
// Atualizar ficha
router.put('/:id', controller.atualizarFicha);
// Deletar ficha
router.delete('/:id', controller.deletarFicha);

module.exports = router;



