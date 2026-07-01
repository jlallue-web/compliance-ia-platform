const pool = require('../database/db');
const { processarAtendimento } = require('./orquestrador-atendimento');

async function testar() {

    try {

        const resultado = await processarAtendimento({
            telefone: '5516999999999',
            mensagem: 'Quero o comprovante da CPFL'
        });

        console.log("\n===== RESULTADO =====\n");

        console.log("FILA");

        console.table([resultado.fila]);

        console.log("\nPROCESSAMENTO");

        console.table([resultado.processamento]);

    } catch (erro) {

        console.error(erro);

    } finally {

        await pool.end();

    }

}

testar();