const pool = require('../database/db');

async function buscarDocumentosPorFornecedor(termo) {
  const resultado = await pool.query(
    `
    SELECT
      fornecedor,
      tipo_documento,
      google_drive_file_id,
      google_drive_path,
      status_indexacao,
      created_at
    FROM comprova.documentos
    WHERE fornecedor ILIKE $1
    ORDER BY created_at DESC
    LIMIT 10
    `,
    [`%${termo}%`]
  );

  return resultado.rows;
}

module.exports = { buscarDocumentosPorFornecedor };