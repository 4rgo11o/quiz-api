const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pergunta = sequelize.define('perguntas', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
     timestamps:false,
});

module.exports = Pergunta;
