require('dotenv').config();

console.log('==============================');
console.log('TESTE OPENAI');
console.log('==============================');
console.log(
    process.env.OPENAI_API_KEY
        ? 'OPENAI_API_KEY: OK'
        : 'OPENAI_API_KEY: NÃO ENCONTRADA'
);