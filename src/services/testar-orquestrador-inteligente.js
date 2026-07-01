const pool = require('../database/db');
const { processarMensagemInteligente } = require('./orquestrador-inteligente');
const { despacharResposta } = require('../dispatcher/despachar-resposta');

async function testar() {

    try {

        const telefone = '5516999999999';

        console.log("\nUSUÁRIO: Quero comprovante da Trinken\n");

        const retorno1 = await processarMensagemInteligente({
            telefone,
            mensagem: 'Quero comprovante da Trinken'
        });

        await despacharResposta(retorno1.respostaUsuario);

        console.log("\nUSUÁRIO: 1\n");

        const retorno2 = await processarMensagemInteligente({
            telefone,
            mensagem: '1'
        });

        await despacharResposta(retorno2.respostaUsuario);

    } catch (erro) {

        console.error(erro);

    } finally {

        await pool.end();

    }

}

testar();