const { classificar } = require('./classificador-intencao');
const { extrairEntidade } = require('./extrator-entidades');

function identificarIntencao(mensagem) {
  const classificacao = classificar(mensagem);

  let entidade = {
    entidade: null,
    bloqueado: false,
    motivo: null
  };

  if (classificacao.modulo === 'comprova') {
    entidade = extrairEntidade(mensagem);
  }

  return {
    ...classificacao,
    entidade: entidade.entidade,
    bloqueado: entidade.bloqueado,
    motivo: entidade.motivo,
    parametros: {}
  };
}

module.exports = {
  identificarIntencao
};