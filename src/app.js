require('dotenv').config();

const express = require('express');
const pool = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const db = await pool.query(`
      SELECT
        current_database() AS banco,
        current_user AS usuario,
        now() AS data_hora
    `);

    res.json({
      status: 'OK',
      app: 'Compliance IA Platform',
      banco: db.rows[0]
    });
  } catch (erro) {
    res.status(500).json({
      status: 'ERRO',
      mensagem: erro.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Compliance IA Platform online na porta ${PORT}`);
});