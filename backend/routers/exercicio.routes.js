const express = require('express');
const router = express.Router();
const controller = require('../controller/exercicio.controller');

router.post('/novo/:fichaId', controller.criarExercicio);
router.get('/ficha/:ficha_id', controller.listarPorFicha);
router.put('/:id', controller.atualizarExercicio);
router.delete('/:id', controller.deletarExercicio);

module.exports = router;