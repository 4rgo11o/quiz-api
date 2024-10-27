const express = require('express');
const dotenv = require('dotenv/config.js');
const perguntaRoutes = require('./routes/perguntas');
const { sequelize, connectDB } = require('./config/db');

const app = express();

app.use(express.json());
app.use('/api/perguntas', perguntaRoutes);

connectDB()
  .then(() => {
    return sequelize.sync();
  })
  .then(() => {
    console.log('Banco de dados sincronizado');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ou sincronizar o banco de dados:', err);
  });






