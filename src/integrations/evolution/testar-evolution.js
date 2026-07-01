require('dotenv').config();

console.log('EVOLUTION_API_URL:', process.env.EVOLUTION_API_URL ? 'OK' : 'NÃO ENCONTRADA');
console.log('EVOLUTION_API_KEY:', process.env.EVOLUTION_API_KEY ? 'OK' : 'NÃO ENCONTRADA');
console.log('EVOLUTION_INSTANCE:', process.env.EVOLUTION_INSTANCE ? 'OK' : 'NÃO ENCONTRADA');