const { identificarIntencao } = require('./ia-router');
const { gerarRespostaRouter } = require('./resposta-router');

const mensagens = [
  'Quero comprovante da carne',
  'Quero comprovante do chopp',
  'Bom dia',
  'Me envie o comprovante da CPFL'
];

for (const mensagem of mensagens) {
  const resultado = identificarIntencao(mensagem);
  const resposta = gerarRespostaRouter(resultado);

  console.log('\nMensagem:', mensagem);
  console.log('Router:', resultado);
  console.log('Resposta:', resposta);
}