const { buscarDocumentosPorFornecedor } = require('./buscar-documentos');

function extrairFornecedorDaMensagem(mensagem) {
  return mensagem
    .replace(/quero/gi, '')
    .replace(/me envie/gi, '')
    .replace(/comprovante/gi, '')
    .replace(/da/gi, '')
    .replace(/do/gi, '')
    .replace(/de/gi, '')
    .replace(/o/gi, '')
    .replace(/a/gi, '')
    .trim();
}

async function executarComprova(mensagem) {
  const fornecedor = extrairFornecedorDaMensagem(mensagem);

  const documentos = await buscarDocumentosPorFornecedor(fornecedor);

  return {
    fornecedorPesquisado: fornecedor,
    totalEncontrado: documentos.length,
    documentos
  };
}

module.exports = { executarComprova };