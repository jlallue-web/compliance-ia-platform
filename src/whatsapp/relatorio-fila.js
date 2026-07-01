const pool = require('../database/db');

async function relatorio() {
  try {
    const resultado = await pool.query(`
      SELECT
        data_recebimento,
        telefone,
        mensagem,
        status,
        processado
      FROM whatsapp.fila_entrada
      ORDER BY data_recebimento DESC
      LIMIT 10
    `);

    console.table(resultado.rows);
  } catch (erro) {
    console.error('Erro:', erro.message);
  } finally {
    await pool.end();
  }
}

relatorio();