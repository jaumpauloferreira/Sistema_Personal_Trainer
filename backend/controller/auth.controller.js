// backend/controller/auth.controller.js
const jwt             = require('jsonwebtoken');
const bcrypt          = require('bcrypt');
const { validationResult } = require('express-validator');
const pool            = require('../config/db');      // sua conexão com o MySQL
const { JWT_SECRET }  = process.env;

exports.register = async (req, res) => {
  // 1) validações do express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nome, email, senha } = req.body;
  try {
    // 2) verifica se já existe usuário
    const [rows] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (rows.length) {
      return res.status(409).json({ error: 'E‑mail já cadastrado' });
    }

    // 3) faz hash da senha
    const hash = await bcrypt.hash(senha, 10);

    // 4) insere no banco
    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)',
      [nome, email, hash]
    );

    // 5) gera token
    const token = jwt.sign(
      { userId: result.insertId, nome, email },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, senha } = req.body;
  try {
    // 1) busca usuário
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (!rows.length) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const user = rows[0];

    // 2) compara senhas
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // 3) gera token
    const token = jwt.sign(
      { userId: user.id, nome: user.nome, tipo: user.tipo },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
