const pool = require('../database/db');
const { listarComprovantes } = require('../integrations/google/drive/listar-comprovantes');

function limparNome(nome) {
  return nome.replace('.pdf', '').trim();
}

function identificarTipo(nome) {
  const texto = nome.toLowerCase();

  if (texto.includes('pix')) return 'PIX';
  if (texto.includes('boleto')) return 'BOLETO';
  if (texto.includes('pagamento')) return 'PAGAMENTO';

  return 'OUTROS';
}

function identificarFornecedor(nome) {
  return limparNome(nome)
    .replace(/^pix enviado para /i, '')
    .replace(/^pagamento para /i, '')
    .trim();
}

async function indexarDrive() {
  try {
    const arquivos = await listarComprovantes(10);

    for (const arquivo of arquivos) {
      await pool.query(
        `
        INSERT INTO comprova.documentos
          (fornecedor, tipo_documento, google_drive_file_id, google_drive_path, origem, status_indexacao)
        VALUES
          ($1, $2, $3, $4, 'GOOGLE_DRIVE', 'INDEXADO')
        ON CONFLICT DO NOTHING
        `,
        [
          identificarFornecedor(arquivo.name),
          identificarTipo(arquivo.name),
          arquivo.id,
          arquivo.webViewLink
        ]
      );
    }

    console.log(`Indexação concluída. Arquivos processados: ${arquivos.length}`);
  } catch (erro) {
    console.error('Erro ao indexar Drive:', erro.message);
  } finally {
    await pool.end();
  }
}

indexarDrive();