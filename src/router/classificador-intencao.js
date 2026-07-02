function classificar(texto) {

  const mensagem = texto.toLowerCase();

  if (
    mensagem.includes('aporte') ||
    mensagem.includes('saldo') ||
    mensagem.includes('pagamento')
  ) {

    return {
      intencao: 'CONSULTA_COCKPIT',
      modulo: 'cockpit',
      confianca: 0.85
    };

  }

  if (
    mensagem.includes('comprovante') ||
    mensagem.includes('pix') ||
    mensagem.includes('boleto')
  ) {

    return {
      intencao: 'BUSCAR_COMPROVANTE',
      modulo: 'comprova',
      confianca: 0.85
    };

  }

  return {
    intencao: 'NAO_IDENTIFICADA',
    modulo: 'router',
    confianca: 0.30
  };

}

module.exports = {
  classificar
};