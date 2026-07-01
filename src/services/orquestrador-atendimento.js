const pool = require('../database/db');
const { adicionarMensagem } = require('../whatsapp/fila');
const { registrarProcessamento } = require('../router/registrar-processamento');

async function processarAtendimento({ telefone, mensagem }) {

    // 1. Coloca na fila
    const fila = await adicionarMensagem({
        telefone,
        mensagem,
        tipo: 'texto'
    });

    console.log("1 - Mensagem adicionada na fila");

    // 2. Processa no IA Router
    const processamento = await registrarProcessamento({
        telefone,
        mensagem
    });

    console.log("2 - IA Router processou a mensagem");

    // 3. Atualiza a fila
    await pool.query(`
        UPDATE whatsapp.fila_entrada
        SET
            processado = true,
            status = 'PROCESSADO'
        WHERE id = $1
    `, [fila.id]);

    console.log("3 - Fila atualizada");

    // 4. Retorna tudo
    return {
        fila,
        processamento
    };

}

module.exports = {
    processarAtendimento
};