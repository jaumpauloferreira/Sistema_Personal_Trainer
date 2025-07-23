const Exercicio = require('../model/entidades/exercicio.model');

exports.criarExercicio = async (req, res) => {
  try {
    const { fichaId } = req.params;
    const dados = req.body;

    const exercicio = {
      ...dados,
      ficha_id: parseInt(fichaId),
      ordem: dados.ordem || 1 // valor padrão, caso não venha do frontend
    };

    const result = await Exercicio.criarExercicio(exercicio);
    res.status(201).json({ message: 'Exercício criado com sucesso!', id: result.insertId });
  } catch (err) {
    console.error('Erro ao criar exercício:', err);
    res.status(500).json({ error: 'Erro ao criar exercício', details: err.message });
  }
};

// Listar por ficha
exports.listarPorFicha = async (req, res) => {
  try {
    const exercicios = await Exercicio.listarPorFicha(req.params.ficha_id);
    res.status(200).json(exercicios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar exercícios', details: err.message });
  }
};

// Atualizar
exports.atualizarExercicio = async (req, res) => {
  try {
    const result = await Exercicio.atualizarExercicio(req.params.id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Exercício não encontrado' });
    res.status(200).json({ message: 'Exercício atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar exercício:', err);
    res.status(500).json({ error: 'Erro ao atualizar exercício', details: err.message });
  }
};

// Deletar
exports.deletarExercicio = async (req, res) => {
  try {
    const result = await Exercicio.deletarExercicio(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Exercício não encontrado' });
    res.status(200).json({ message: 'Exercício removido com sucesso' });
  } catch (err) {
    console.error('Erro ao remover exercício:', err);
    res.status(500).json({ error: 'Erro ao remover exercício', details: err.message });
  }
};
