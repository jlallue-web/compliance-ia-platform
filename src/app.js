require('dotenv').config();

const express = require('express');
const pool = require('./database/db');
const { listarComprovantes } = require('./integrations/google/drive/listar-comprovantes');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const db = await pool.query(`
      SELECT current_database() AS banco, current_user AS usuario, now() AS data_hora
    `);

    res.json({
      status: 'OK',
      app: 'Compliance IA Platform',
      banco: db.rows[0]
    });
  } catch (erro) {
    res.status(500).json({ status: 'ERRO', mensagem: erro.message });
  }
});

app.get('/google/teste', async (req, res) => {
  try {
    const arquivos = await listarComprovantes(5);
    res.json({ status: 'OK', origem: 'Google Drive', total: arquivos.length, arquivos });
  } catch (erro) {
    res.status(500).json({ status: 'ERRO', mensagem: erro.message });
  }
});

app.get('/openai/teste', async (req, res) => {
  try {
    const resposta = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: 'Responda apenas: OpenAI conectada com sucesso.'
      })
    });

    const data = await resposta.json();

    if (!resposta.ok) {
      return res.status(500).json({
        status: 'ERRO',
        origem: 'OpenAI',
        detalhe: data
      });
    }

    res.json({
      status: 'OK',
      origem: 'OpenAI',
      resposta: data.output_text
    });
  } catch (erro) {
    res.status(500).json({ status: 'ERRO', mensagem: erro.message });
  }
});

app.listen(PORT, () => {
  console.log(`Compliance IA Platform online na porta ${PORT}`);
});