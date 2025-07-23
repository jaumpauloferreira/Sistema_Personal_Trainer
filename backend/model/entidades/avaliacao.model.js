const db = require('../../config/db');

// Adicionar avaliação física
exports.adicionarAvaliacao = async (avaliacao) => {
  const query = `
    INSERT INTO avaliacoes_fisicas (
      aluno_id, data_avaliacao, peso, imc,
      braco_direito, braco_esquerdo,
      perna_direita, perna_esquerda,
      peitoral, abdomen
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    avaliacao.aluno_id,
    avaliacao.data_avaliacao,
    avaliacao.peso,
    avaliacao.imc || null,
    avaliacao.braco_direito,
    avaliacao.braco_esquerdo,
    avaliacao.perna_direita,
    avaliacao.perna_esquerda,
    avaliacao.peitoral,
    avaliacao.abdomen
  ];

  const [result] = await db.query(query, valores);
  return result;
};

// Listar histórico de avaliações por aluno
exports.listarPorAluno = async (aluno_id) => {
  const [rows] = await db.query(
    'SELECT * FROM avaliacoes_fisicas WHERE aluno_id = ? ORDER BY data_avaliacao DESC',
    [aluno_id]
  );
  return rows;
};
