function formatarRespostaComprova(resultado) {
  if (!resultado || resultado.totalEncontrado === 0) {
    return `Não localizei comprovantes para "${resultado?.fornecedorPesquisado || 'o fornecedor informado'}".`;
  }

  const linhas = resultado.documentos.map((doc, index) => {
    return `${index + 1}. ${doc.fornecedor} (${doc.tipo_documento})`;
  });

  return [
    `Encontrei ${resultado.totalEncontrado} comprovante(s) para "${resultado.fornecedorPesquisado}":`,
    '',
    ...linhas,
    '',
    'Qual deles você deseja receber?'
  ].join('\n');
}

module.exports = { formatarRespostaComprova };