const pool = require('../database/db');

async function salvarContexto({ telefone, modulo, estado, contexto }) {
  await pool.query(`
    INSERT INTO whatsapp.sessoes
      (telefone, modulo_atual, estado, contexto, ultima_interacao, expira_em)
    VALUES
      ($1, $2, $3, $4, now(), now() + interval '30 minutes')
    ON CONFLICT (telefone)
    DO UPDATE SET
      modulo_atual = EXCLUDED.modulo_atual,
      estado = EXCLUDED.estado,
      contexto = EXCLUDED.contexto,
      ultima_interacao = now(),
      expira_em = now() + interval '30 minutes'
  `, [telefone, modulo, estado, JSON.stringify(contexto)]);
}

async function obterContexto(telefone) {
  const resultado = await pool.query(`
    SELECT *
    FROM whatsapp.sessoes
    WHERE telefone = $1
      AND expira_em > now()
    LIMIT 1
  `, [telefone]);

  return resultado.rows[0] || null;
}

module.exports = {
  salvarContexto,
  obterContexto
};