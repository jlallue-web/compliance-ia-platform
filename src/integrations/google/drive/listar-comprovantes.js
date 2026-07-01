require('dotenv').config();

const { google } = require('googleapis');
const { getGoogleAuth } = require('../auth');

async function listarComprovantes(pageSize = 10) {
  const auth = getGoogleAuth();
  const client = await auth.getClient();

  const drive = google.drive({ version: 'v3', auth: client });

  const resposta = await drive.files.list({
    pageSize,
    q: "mimeType='application/pdf' and trashed=false",
    fields: 'files(id, name, mimeType, createdTime, modifiedTime, webViewLink)'
  });

  return resposta.data.files || [];
}

module.exports = { listarComprovantes };