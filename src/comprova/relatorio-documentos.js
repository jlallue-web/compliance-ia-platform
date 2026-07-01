const pool = require('../database/db');

async function relatorio() {
  try {
    const resultado = await pool.query(`
      SELECT
        fornecedor,
        tipo_documento,
        google_drive_file_id,
        status_indexacao,
        created_at
      FROM comprova.documentos
      ORDER BY created_at DESC
      LIMIT 20
    `);

    console.table(resultado.rows);
  } catch (erro) {
    console.error('Erro:', erro.message);
  } finally {
    await pool.end();
  }
}

relatorio();