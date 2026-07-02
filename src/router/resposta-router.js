function gerarRespostaRouter(resultado, perfil = 'OPERACIONAL') {
  if (resultado.bloqueado && resultado.motivo === 'PRODUTO_NAO_SUPORTADO') {
    return {
      tipo: 'TEXTO',
      texto: 'Para localizar um comprovante financeiro, informe o nome do fornecedor ou beneficiário.'
    };
  }

  if (resultado.intencao === 'NAO_IDENTIFICADA') {
    if (perfil === 'MASTER') {
      return {
        tipo: 'TEXTO',
        texto: 'Não consegui identificar sua solicitação. Você pode pedir comprovantes, pagamentos, saldo ou aporte.'
      };
    }

    return {
      tipo: 'TEXTO',
      texto: 'Não consegui identificar sua solicitação. Para consultar comprovantes, informe o nome do fornecedor ou beneficiário.'
    };
  }

  return null;
}

module.exports = {
  gerarRespostaRouter
};