const Pergunta = require('./models/Pergunta');
const OpcaoResposta = require('./models/OpcaoResposta');
const sequelize = require('./config/db'); // A conexão com o banco de dados

async function populateDatabase() {
  try {
    await sequelize.sync(); // Sincroniza com o banco de dados

    // Verifica se há perguntas no banco
    const perguntaCount = await Pergunta.count();
    if (perguntaCount > 0) {
      console.log("Banco de dados já possui dados.");
      return;
    }

    // Cria perguntas e opções de respostas iniciais
    const perguntasData = [
      {
        titulo: 'Qual é a capital do Brasil?',
        opcoes_resposta: [
          { texto: 'Rio de Janeiro', correta: false },
          { texto: 'Brasília', correta: true },
          { texto: 'São Paulo', correta: false },
          { texto: 'Salvador', correta: false },
        ],
      },
      {
        titulo: 'Qual é o maior planeta do Sistema Solar?',
        opcoes_resposta: [
          { texto: 'Terra', correta: false },
          { texto: 'Júpiter', correta: true },
          { texto: 'Marte', correta: false },
          { texto: 'Vênus', correta: false },
        ],
      },
      {
        titulo: 'Quem pintou a Mona Lisa?',
        opcoes_resposta: [
          { texto: 'Vincent van Gogh', correta: false },
          { texto: 'Leonardo da Vinci', correta: true },
          { texto: 'Pablo Picasso', correta: false },
          { texto: 'Michelangelo', correta: false },
        ],
      },
      {
        titulo: 'Em que ano o homem pisou na Lua pela primeira vez?',
        opcoes_resposta: [
          { texto: '1965', correta: false },
          { texto: '1969', correta: true },
          { texto: '1972', correta: false },
          { texto: '1961', correta: false },
        ],
      },
      {
        titulo: 'Qual é o elemento químico mais abundante no universo?',
        opcoes_resposta: [
          { texto: 'Oxigênio', correta: false },
          { texto: 'Carbono', correta: false },
          { texto: 'Hidrogênio', correta: true },
          { texto: 'Nitrogênio', correta: false },
        ],
      },
    ];

    // Inserir perguntas e opções de resposta
    for (const perguntaData of perguntasData) {
      const pergunta = await Pergunta.create({ titulo: perguntaData.titulo });
      await OpcaoResposta.bulkCreate(
        perguntaData.opcoes_resposta.map((opcao) => ({
          ...opcao,
          perguntaId: pergunta.id,
        }))
      );
    }

    console.log("Banco de dados populado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await sequelize.close();
  }
}

populateDatabase();
