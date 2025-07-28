// backend/routers/auth.routes.js
const express = require('express');
const { body } = require('express-validator');
const router  = express.Router();
const authController = require('../controller/auth.controller');

router.post(
  '/register',
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('E‑mail inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha precisa ter pelo menos 6 caracteres'),
  authController.register
);

router.post(
  '/login',
  body('email').isEmail().withMessage('E‑mail inválido'),
  body('senha').notEmpty().withMessage('Senha é obrigatória'),
  authController.login
);

module.exports = router;
