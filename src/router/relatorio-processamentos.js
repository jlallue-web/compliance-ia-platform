const pool = require('../database/db');

async function relatorio() {
  try {
    const resultado = await pool.query(`
      SELECT
        data_hora,
        telefone,
        mensagem,
        intencao,
        modulo_destino,
        confianca,
        status
      FROM router.processamentos
      ORDER BY data_hora DESC
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