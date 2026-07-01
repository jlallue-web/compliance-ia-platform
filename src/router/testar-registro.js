const pool = require('../database/db');
const { registrarProcessamento } = require('./registrar-processamento');

async function testar() {
  try {
    const registro = await registrarProcessamento({
      telefone: '5516999999999',
      mensagem: 'Qual o aporte de hoje?'
    });

    console.log('Processamento registrado com sucesso:');
    console.table([registro]);
  } catch (erro) {
    console.error('Erro:', erro.message);
  } finally {
    await pool.end();
  }
}

testar();