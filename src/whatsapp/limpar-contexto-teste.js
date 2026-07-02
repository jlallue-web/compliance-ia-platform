require('dotenv').config();

const pool = require('../database/db');

async function limpar() {
  try {
    await pool.query(
      `DELETE FROM whatsapp.sessoes WHERE telefone = $1`,
      ['5516999999999']
    );

    console.log('Contexto limpo');
  } catch (erro) {
    console.error(erro.message);
  } finally {
    await pool.end();
  }
}

limpar();