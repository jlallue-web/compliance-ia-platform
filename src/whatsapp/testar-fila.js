const pool = require('../database/db');
const { adicionarMensagem } = require('./fila');

async function testar() {

    try {

        const fila = await adicionarMensagem({
            telefone: '5516999999999',
            mensagem: 'Me envie o comprovante da CPFL'
        });

        console.log("Mensagem inserida na fila");

        console.table([fila]);

    } catch (erro) {

        console.error(erro);

    } finally {

        await pool.end();

    }

}

testar();