require('dotenv').config();

const { google } = require('googleapis');
const { getGoogleAuth } = require('./auth');

async function testarGoogleAuth() {
  try {
    const auth = getGoogleAuth();
    const client = await auth.getClient();

    const drive = google.drive({ version: 'v3', auth: client });

    const resposta = await drive.files.list({
      pageSize: 5,
      fields: 'files(id, name, mimeType)'
    });

    console.log('Conexão com Google Drive OK');
    console.table(resposta.data.files);
  } catch (erro) {
    console.error('Erro ao conectar no Google:');
    console.error(erro.message);
  }
}

testarGoogleAuth();