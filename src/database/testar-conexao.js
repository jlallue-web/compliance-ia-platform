const pool = require('./db');

async function testarConexao() {
  try {
    const resultado = await pool.query(`
      SELECT
        current_database() AS banco,
        current_user AS usuario,
        now() AS data_hora
    `);

    console.log('Conexão com PostgreSQL OK');
    console.table(resultado.rows);
  } catch (erro) {
    console.error('Erro ao conectar no PostgreSQL:');
    console.error(erro.message);
  } finally {
    await pool.end();
  }
}

testarConexao();