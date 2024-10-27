const express = require('express');
const router = express.Router();
const Pergunta = require('../models/Pergunta');
const OpcaoResposta = require('../models/OpcaoResposta');

// Listar todas as perguntas com opções de resposta
router.get('/', async (req, res) => {
  try {
    const perguntas = await Pergunta.findAll({
      include: [OpcaoResposta],
    });
    res.json(perguntas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar perguntas' });
  }
});

module.exports = router;
