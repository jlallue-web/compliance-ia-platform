require('dotenv').config();

const axios = require('axios');

const evolution = axios.create({
    baseURL: process.env.EVOLUTION_API_URL,
    headers: {
        apikey: process.env.EVOLUTION_API_KEY,
        "Content-Type": "application/json"
    },
    timeout: 30000
});

module.exports = evolution;