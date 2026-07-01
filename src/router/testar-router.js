const { identificarIntencao } = require('./ia-router');

const mensagens = [
  'Qual o aporte de hoje?',
  'Me envie o comprovante da CPFL',
  'Tem pagamento para hoje?',
  'Quero o boleto da Trinken',
  'Bom dia'
];

for (const mensagem of mensagens) {
  console.log('\nMensagem:', mensagem);
  console.log(identificarIntencao(mensagem));
}