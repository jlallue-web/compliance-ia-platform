const pool = require('../database/db');
const { registrarProcessamento } = require('../router/registrar-processamento');

async function processarFila() {

    const fila = await pool.query(`
        SELECT *
        FROM whatsapp.fila_entrada
        WHERE processado = false
        ORDER BY data_recebimento
        LIMIT 1
    `);

    if (fila.rows.length === 0) {
        console.log("Nenhuma mensagem pendente.");
        return;
    }

    const mensagem = fila.rows[0];

    console.log("Processando:");

    console.log(mensagem.mensagem);

    await registrarProcessamento({
        telefone: mensagem.telefone,
        mensagem: mensagem.mensagem
    });

    await pool.query(`
        UPDATE whatsapp.fila_entrada
        SET
            processado = true,
            status='PROCESSADO'
        WHERE id=$1
    `,[mensagem.id]);

    console.log("Mensagem processada com sucesso.");

}

processarFila()
.then(()=>pool.end())
.catch(console.error);