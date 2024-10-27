const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Pergunta = require('./Pergunta');

const OpcaoResposta = sequelize.define('opcoes_resposta', {
  texto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  id_pergunta: { // Adicionando a coluna perguntaId
    type: DataTypes.INTEGER,
    references: {
      model: Pergunta, // A tabela referenciada
      key: 'id',       // A chave primária na tabela referenciada
    },
    allowNull: false, // Se desejar, pode permitir null
  }
}, {
  timestamps: false, // Desativa os timestamps
});

// Definindo o relacionamento
OpcaoResposta.belongsTo(Pergunta, { foreignKey: 'id_pergunta' });
Pergunta.hasMany(OpcaoResposta, { foreignKey: 'id_pergunta' });

module.exports = OpcaoResposta;

