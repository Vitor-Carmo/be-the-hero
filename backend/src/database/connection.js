const knex = require('knex');
const configuration = require('../../knexfile');


//banco de test integration ou o banco de desenvolvimento
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection; 