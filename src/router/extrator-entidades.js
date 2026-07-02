const termosProduto = [
  'carne',
  'chopp',
  'cerveja',
  'refrigerante',
  'produto',
  'mercadoria'
];

function extrairEntidade(mensagem) {
  const texto = mensagem.toLowerCase();

  for (const termo of termosProduto) {
    if (texto.includes(termo)) {
      return {
        entidade: null,
        bloqueado: true,
        motivo: 'PRODUTO_NAO_SUPORTADO'
      };
    }
  }

  const padroes = [
    /comprovante da (.+)/i,
    /comprovante de (.+)/i,
    /boleto da (.+)/i,
    /boleto de (.+)/i,
    /pix da (.+)/i,
    /pix de (.+)/i,
    /pagamento para (.+)/i
  ];

  for (const padrao of padroes) {
    const match = mensagem.match(padrao);

    if (match && match[1]) {
      return {
        entidade: match[1].trim(),
        bloqueado: false,
        motivo: null
      };
    }
  }

  return {
    entidade: null,
    bloqueado: false,
    motivo: null
  };
}

module.exports = {
  extrairEntidade
};