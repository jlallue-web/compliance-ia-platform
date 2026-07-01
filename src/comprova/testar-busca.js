const pool = require('../database/db');
const { buscarDocumentosPorFornecedor } = require('./buscar-documentos');

async function testar() {
  try {
    const documentos = await buscarDocumentosPorFornecedor('Trinken');

    console.log('Documentos encontrados:');
    console.table(documentos);
  } catch (erro) {
    console.error('Erro:', erro.message);
  } finally {
    await pool.end();
  }
}

testar();