const pool = require('../database/db');

async function adicionarMensagem({ telefone, mensagem, tipo = 'texto' }) {

    const resultado = await pool.query(
        `
        INSERT INTO whatsapp.fila_entrada
        (telefone, mensagem, tipo)
        VALUES ($1,$2,$3)
        RETURNING *
        `,
        [telefone, mensagem, tipo]
    );

    return resultado.rows[0];
}

module.exports = {
    adicionarMensagem
};