const db = require('../../config/db');

exports.criarAluno = async (aluno) => {
  const {
    nome,
    data_nascimento,
    sexo,
    altura,
    peso,
    telefone,
    email,
    objetivo,
    data_inicio,
    foto_path = null   // pega null se não vier
  } = aluno;

  const [result] = await db.query(
    `INSERT INTO alunos
      (nome, data_nascimento, sexo, altura, peso, telefone, email, objetivo, data_inicio, foto_path)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nome, data_nascimento, sexo, altura, peso, telefone, email, objetivo, data_inicio, foto_path]
  );

  return result;
};

exports.atualizarAluno = async (id, aluno) => {
  const query = `
    UPDATE alunos 
    SET nome = ?, data_nascimento = ?, sexo = ?, altura = ?, peso = ?, 
        telefone = ?, email = ?, objetivo = ?, data_inicio = ?
    WHERE id = ?`;
  const valores = [
    aluno.nome,
    aluno.data_nascimento,
    aluno.sexo,
    aluno.altura,
    aluno.peso,
    aluno.telefone,
    aluno.email,
    aluno.objetivo,
    aluno.data_inicio,
    id
  ];
  const [result] = await db.query(query, valores);
  return result;
};

exports.listarAlunos = async () => {
  const [rows] = await db.query(`
    SELECT id, nome, data_nascimento, sexo, altura, peso, 
           telefone, email, objetivo, data_inicio, foto_path
    FROM alunos`);
  return rows;
};

exports.buscarPorId = async (id) => {
  const [rows] = await db.query(`
    SELECT id, nome, data_nascimento, sexo, altura, peso, 
           telefone, email, objetivo, data_inicio, foto_path
    FROM alunos WHERE id = ?`, [id]);
  return rows[0];
};

exports.atualizarFoto = async (id, fotoPath) => {
  const [result] = await db.query('UPDATE alunos SET foto_path = ? WHERE id = ?', [fotoPath, id]);
  return result;
};

exports.calcularIMC = async (alunoId) => {
  const [rows] = await db.query(`
    SELECT altura, peso, (peso / POW(altura/100, 2)) AS imc
    FROM alunos WHERE id = ?`, [alunoId]);
  return rows[0];
};

exports.deletarAluno = async (id) => {
  const [result] = await db.query('DELETE FROM alunos WHERE id = ?', [id]);
  return result;
};
