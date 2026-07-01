const { registrarProcessamento } = require('../router/registrar-processamento');
const { executarComprova } = require('../comprova/executar-comprova');
const { formatarRespostaComprova } = require('../comprova/formatar-resposta');
const { salvarContexto, obterContexto } = require('../whatsapp/contexto');
const Envelope = require('../core/envelope-resposta');

async function processarMensagemInteligente({ telefone, mensagem }) {

  const contextoAtual = await obterContexto(telefone);

  // Continua uma conversa já iniciada
  if (
    contextoAtual &&
    contextoAtual.modulo_atual === 'comprova' &&
    contextoAtual.estado === 'AGUARDANDO_ESCOLHA_COMPROVANTE'
  ) {

    const numero = parseInt(mensagem.trim(), 10);
    const documentos = contextoAtual.contexto.documentos || [];
    const escolhido = documentos[numero - 1];

    if (!escolhido) {
      return {
        respostaUsuario: Envelope.texto(
          'Não entendi a opção. Responda com o número do comprovante desejado.'
        )
      };
    }

    return {
      respostaUsuario: Envelope.pdf(
        'Perfeito. Segue o comprovante solicitado.',
        escolhido
      ),
      documento: escolhido
    };
  }

  // Nova mensagem
  const processamento = await registrarProcessamento({
    telefone,
    mensagem
  });

  let resultadoModulo = null;
  let respostaUsuario = Envelope.texto(
    'Não consegui identificar a solicitação.'
  );

  // COMPROVA AI
  if (processamento.modulo_destino === 'comprova') {

    resultadoModulo = await executarComprova(mensagem);

    await salvarContexto({
      telefone,
      modulo: 'comprova',
      estado: 'AGUARDANDO_ESCOLHA_COMPROVANTE',
      contexto: {
        documentos: resultadoModulo.documentos
      }
    });

    respostaUsuario = Envelope.lista(
      formatarRespostaComprova(resultadoModulo),
      resultadoModulo.documentos
    );
  }

  // COCKPIT
  if (processamento.modulo_destino === 'cockpit') {

    respostaUsuario = Envelope.texto(
      'Consulta Cockpit identificada. Integração com Cockpit será ligada na próxima etapa.'
    );

  }

  return {
    processamento,
    resultadoModulo,
    respostaUsuario
  };

}

module.exports = {
  processarMensagemInteligente
};