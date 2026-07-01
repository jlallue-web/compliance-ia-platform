const pool = require('../database/db');
const { executarComprova } = require('./executar-comprova');

async function testar() {
  try {
    const resultado = await executarComprova('Quero comprovante da Trinken');

    console.log('Resultado Comprova AI:');
    console.log('Fornecedor pesquisado:', resultado.fornecedorPesquisado);
    console.log('Total encontrado:', resultado.totalEncontrado);
    console.table(resultado.documentos);
  } catch (erro) {
    console.error('Erro:', erro.message);
  } finally {
    await pool.end();
  }
}

testar();