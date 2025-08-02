const Aluno = require('../model/entidades/aluno.model');

exports.criarAluno = async (req, res) => {
  console.log('>>> REQ.BODY:', req.body);
  console.log('>>> REQ.FILE:', req.file);

  try {
    const aluno = req.body;

    if (req.file) {
      // Salva apenas o nome do arquivo (ex: 'imagem.jpeg')
      aluno.foto_path = req.file.filename;
    }

    const result = await Aluno.criarAluno(aluno);
    return res.status(201).json({
      message: 'Aluno cadastrado com sucesso!',
      id: result.insertId
    });
  } catch (err) {
    console.error('❌ ERRO NO CRIAR ALUNO:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }
    return res.status(500).json({
      error: 'Erro ao cadastrar aluno',
      details: err.message
    });
  }
};

exports.listarAlunos = async (req, res) => {
  console.log('ListarAlunos: iniciando listagem');
  try {
    const alunos = await Aluno.listarAlunos();
    console.log('ListarAlunos: resultado =', alunos);
    return res.status(200).json(alunos);
  } catch (err) {
    console.error('❌ ERRO listarAlunos:', err);
    return res.status(500).json({
      error: 'Erro ao buscar alunos',
      details: err.message
    });
  }
};

exports.buscarAlunoPorId = async (req, res) => {
  try {
    const aluno = await Aluno.buscarPorId(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    return res.status(200).json(aluno);
  } catch (err) {
    console.error('❌ ERRO buscarAlunoPorId:', err);
    return res.status(500).json({
      error: 'Erro ao buscar aluno',
      details: err.message
    });
  }
};

exports.atualizarAluno = async (req, res) => {
  try {
    const result = await Aluno.atualizarAluno(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Aluno não encontrado' });
    return res.status(200).json({ message: 'Aluno atualizado com sucesso!' });
  } catch (err) {
    console.error('❌ ERRO atualizarAluno:', err);
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ error: 'Email já em uso' });
    return res.status(500).json({
      error: 'Erro ao atualizar aluno',
      details: err.message
    });
  }
};

exports.deletarAluno = async (req, res) => {
  try {
    const result = await Aluno.deletarAluno(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Aluno não encontrado' });
    return res.status(200).json({ message: 'Aluno removido com sucesso!' });
  } catch (err) {
    console.error('❌ ERRO deletarAluno:', err);
    return res.status(500).json({
      error: 'Erro ao remover aluno',
      details: err.message
    });
  }
};

exports.uploadFoto = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: 'Nenhuma foto enviada' });
  try {
    // Salva apenas o nome do arquivo no banco
    const result = await Aluno.atualizarFoto(req.params.id, req.file.filename);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Aluno não encontrado' });
    return res.status(200).json({
      message: 'Foto atualizada',
      path: req.file.filename
    });
  } catch (err) {
    console.error('❌ ERRO uploadFoto:', err);
    return res.status(500).json({
      error: 'Erro ao salvar foto',
      details: err.message
    });
  }
};

exports.calcularIMC = async (req, res) => {
  try {
    const dados = await Aluno.calcularIMC(req.params.id);
    if (!dados) return res.status(404).json({ error: 'Aluno não encontrado' });
    return res.status(200).json({ imc: dados.imc });
  } catch (err) {
    console.error('❌ ERRO calcularIMC:', err);
    return res.status(500).json({
      error: 'Erro ao calcular IMC',
      details: err.message
    });
  }
};
