require('dotenv').config();

const evolution = require('./client');

async function statusEvolution() {
  try {
    const instance = process.env.EVOLUTION_INSTANCE;

    const resposta = await evolution.get(`/instance/connectionState/${instance}`);

    console.log('Status da Evolution:');
    console.log(resposta.data);
  } catch (erro) {
    console.error('Erro ao consultar Evolution:');
    console.error(erro.response?.data || erro.message);
  }
}

statusEvolution();