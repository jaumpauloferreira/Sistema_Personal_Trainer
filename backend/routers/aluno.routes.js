const express = require('express');
const router = express.Router();
const controller = require('../controller/aluno.controller');
const upload = require('../middlewares/uploadFoto');

router.post('/', upload.single('foto'), controller.criarAluno);  // <==== assim ?
router.get('/', controller.listarAlunos);
router.get('/:id', controller.buscarAlunoPorId);
router.put('/:id', controller.atualizarAluno);
router.delete('/:id', controller.deletarAluno);
router.put('/:id/foto', upload.single('foto'), controller.uploadFoto);
router.get('/:id/imc', controller.calcularIMC);


module.exports = router;

