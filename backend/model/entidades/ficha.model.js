const db = require('../../config/db');

// Criar nova ficha de treino
exports.criarFicha = async (ficha) => {
  const query = `
    INSERT INTO fichas (aluno_id, titulo, data_criacao, arquivada, observacoes)
    VALUES (?, ?, ?, ?, ?)`;

  const valores = [
    ficha.aluno_id,
    ficha.titulo,
    ficha.data_criacao,
    ficha.arquivada || false,
    ficha.observacoes || null
  ];

  const [result] = await db.query(query, valores);
  return result;
};

// Buscar fichas por aluno
exports.listarPorAluno = async (aluno_id) => {
  const [rows] = await db.query('SELECT * FROM fichas WHERE aluno_id = ?', [aluno_id]);
  return rows;
};

// Atualizar ficha
exports.atualizarFicha = async (id, ficha) => {
  const query = `
    UPDATE fichas 
    SET titulo = ?, data_criacao = ?, arquivada = ?, observacoes = ?
    WHERE id = ?`;

  const valores = [
    ficha.titulo,
    ficha.data_criacao,
    ficha.arquivada,
    ficha.observacoes,
    id
  ];

  const [result] = await db.query(query, valores);
  return result;
};

// Deletar ficha
exports.deletarFicha = async (id) => {
  const [result] = await db.query('DELETE FROM fichas WHERE id = ?', [id]);
  return result;
};
