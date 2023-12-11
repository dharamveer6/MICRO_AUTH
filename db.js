require('dotenv').config();

const Knex = require('knex');


const knexConfig = require('./knexfile');

const knex = Knex(knexConfig.development);
console.log("connect")




module.exports = knex;
