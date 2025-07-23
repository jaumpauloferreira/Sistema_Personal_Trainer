const db = require('../../config/db');

// Criar novo exercício para uma ficha
exports.criarExercicio = async (exercicio) => {
  const query = `
    INSERT INTO exercicios (
      ficha_id, nome_exercicio, series, repeticoes, carga, observacoes, dia_semana, ordem
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const valores = [
    exercicio.ficha_id,
    exercicio.nome_exercicio,
    exercicio.series,
    exercicio.repeticoes,
    exercicio.carga,
    exercicio.observacoes,
    exercicio.dia_semana,
    exercicio.ordem
  ];

  const [result] = await db.query(query, valores);
  return result;
};

// Buscar exercícios por ficha
exports.listarPorFicha = async (ficha_id) => {
  const [rows] = await db.query('SELECT * FROM exercicios WHERE ficha_id = ? ORDER BY ordem', [ficha_id]);
  return rows;
};

// Atualizar exercício
exports.atualizarExercicio = async (id, exercicio) => {
  const query = `
    UPDATE exercicios
    SET nome_exercicio = ?, series = ?, repeticoes = ?, carga = ?, observacoes = ?, dia_semana = ?, ordem = ?
    WHERE id = ?`;

  const valores = [
    exercicio.nome_exercicio,
    exercicio.series,
    exercicio.repeticoes,
    exercicio.carga,
    exercicio.observacoes,
    exercicio.dia_semana,
    exercicio.ordem,
    id
  ];

  const [result] = await db.query(query, valores);
  return result;
};

// Deletar exercício
exports.deletarExercicio = async (id) => {
  const [result] = await db.query('DELETE FROM exercicios WHERE id = ?', [id]);
  return result;
};