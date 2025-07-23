const Ficha = require('../model/entidades/ficha.model');

// Criar nova ficha para um aluno
exports.criarFicha = async (req, res) => {
  try {
    const { alunoId } = req.params;
    const dados = req.body;

    const ficha = {
      ...dados,
      aluno_id: parseInt(alunoId),
      arquivada: false // valor padrão
    };

    const result = await Ficha.criarFicha(ficha);
    res.status(201).json({ message: 'Ficha criada com sucesso!', id: result.insertId });
  } catch (err) {
    console.error('Erro ao criar ficha:', err);
    res.status(500).json({ error: 'Erro ao criar ficha', details: err.message });
  }
};

// Listar fichas por aluno
exports.listarFichasPorAluno = async (req, res) => {
  try {
    const { aluno_id } = req.params;
    console.log('🔎 Buscando fichas do aluno:', aluno_id);
    const fichas = await Ficha.listarPorAluno(aluno_id);
    console.log('📦 Fichas encontradas:', fichas);
    res.status(200).json(fichas);
  } catch (err) {
    console.error('❌ Erro ao buscar fichas:', err);
    res.status(500).json({ error: 'Erro ao buscar fichas', details: err.message });
  }
};

// Atualizar ficha existente
exports.atualizarFicha = async (req, res) => {
  try {
    const result = await Ficha.atualizarFicha(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ficha não encontrada' });
    }
    res.status(200).json({ message: 'Ficha atualizada com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar ficha:', err);
    res.status(500).json({ error: 'Erro ao atualizar ficha', details: err.message });
  }
};

// Deletar ficha existente
exports.deletarFicha = async (req, res) => {
  try {
    const result = await Ficha.deletarFicha(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ficha não encontrada' });
    }
    res.status(200).json({ message: 'Ficha excluída com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir ficha:', err);
    res.status(500).json({ error: 'Erro ao excluir ficha', details: err.message });
  }
};
