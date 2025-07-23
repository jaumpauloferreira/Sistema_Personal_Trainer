const Avaliacao = require('../model/entidades/avaliacao.model');

// Criar nova avaliacao
exports.criarAvaliacao = async (req, res) => {
  try {
    const { alunoId } = req.params;
    const dados = {
      ...req.body,
      aluno_id: parseInt(alunoId) 
    };

    const result = await Avaliacao.adicionarAvaliacao(dados);
    res.status(201).json({ message: 'Avaliação registrada com sucesso!', id: result.insertId });
  } catch (err) {
    console.error('Erro ao registrar avaliação:', err);
    res.status(500).json({ error: 'Erro ao registrar avaliação', details: err.message });
  }
};


// Listar histórico de avaliações de um aluno
exports.listarAvaliacoes = async (req, res) => {
  try {
    const { aluno_id } = req.params;
    const avaliacoes = await Avaliacao.listarPorAluno(aluno_id);
    res.status(200).json(avaliacoes);
  } catch (err) {
    console.error('Erro ao buscar avaliações:', err);
    res.status(500).json({ error: 'Erro ao buscar avaliações', details: err.message });
  }
};