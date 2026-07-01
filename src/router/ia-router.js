function identificarIntencao(mensagem) {
  const texto = mensagem.toLowerCase();

  if (texto.includes('aporte') || texto.includes('pagamento') || texto.includes('saldo')) {
    return {
      intencao: 'CONSULTA_COCKPIT',
      modulo: 'cockpit',
      confianca: 0.85
    };
  }

  if (texto.includes('comprovante') || texto.includes('pix') || texto.includes('boleto')) {
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
  identificarIntencao
};