const pool = require('./database/db');

async function iniciar() {
  try {
    const db = await pool.query(`
      SELECT
        current_database() AS banco,
        current_user AS usuario,
        now() AS data_hora
    `);

    const tabelas = await pool.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_schema IN ('core','router','whatsapp','cockpit','comprova','integration','audit')
      ORDER BY table_schema, table_name
    `);

    console.log('Compliance IA Platform iniciada com sucesso');
    console.table(db.rows);
    console.table(tabelas.rows);
  } catch (erro) {
    console.error('Erro ao iniciar plataforma:', erro.message);
  } finally {
    await pool.end();
  }
}

iniciar();