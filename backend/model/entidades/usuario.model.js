// backend/model/entidades/usuario.model.js
const db = require('../../config/db')

const Usuario = {
  // busca um usuário pelo e-mail (retorna objeto ou undefined)
  async findByEmail(email) {
    const [rows] = await db.promise().execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    )
    return rows[0]
  },

  // cria um novo usuário e retorna o ID gerado
  async create({ nome, email, senhaHash, tipo }) {
    const [result] = await db.promise().execute(
      'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
      [nome, email, senhaHash, tipo || 'professor']
    )
    return result.insertId
  }
}

module.exports = Usuario