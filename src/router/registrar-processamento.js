const pool = require('../database/db');
const { identificarIntencao } = require('./ia-router');

async function registrarProcessamento({ telefone, mensagem }) {
  const inicio = Date.now();

  const decisao = identificarIntencao(mensagem);

  await pool.query(
    `
    INSERT INTO router.processamentos
      (telefone, mensagem, intencao, modulo_destino, confianca, status, tempo_processamento_ms)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
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

  return {
    telefone,
    mensagem,
    intencao: decisao.intencao,
    modulo_destino: decisao.modulo,
    confianca: decisao.confianca,
    entidade: decisao.entidade,
    bloqueado: decisao.bloqueado,
    motivo: decisao.motivo,
    parametros: decisao.parametros || {}
  };
}

module.exports = { registrarProcessamento };