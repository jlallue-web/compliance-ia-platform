const pool = require('../database/db');
const { identificarIntencao } = require('./ia-router');

async function registrarProcessamento({ telefone, mensagem }) {
  const inicio = Date.now();

  const decisao = identificarIntencao(mensagem);

  const resultado = await pool.query(
    `
    INSERT INTO router.processamentos
      (telefone, mensagem, intencao, modulo_destino, confianca, status, tempo_processamento_ms)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, data_hora, telefone, mensagem, intencao, modulo_destino, confianca, status
    `,
    [
      telefone,
      mensagem,
      decisao.intencao,
      decisao.modulo,
      decisao.confianca,
      'PROCESSADO',
      Date.now() - inicio
    ]
  );

  return resultado.rows[0];
}

module.exports = { registrarProcessamento };