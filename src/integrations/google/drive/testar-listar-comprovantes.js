const { listarComprovantes } = require('./listar-comprovantes');

async function testar() {
  try {
    const arquivos = await listarComprovantes(10);

    console.log('Comprovantes encontrados no Google Drive:');
    console.table(arquivos);
  } catch (erro) {
    console.error('Erro:', erro.message);
  }
}

testar();