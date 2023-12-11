const knex = require("../db");


exports.up = function(knex) {
    return knex.schema.createTable('clients', function(table) {
      table.increments('id').primary().notNullable().defaultTo(null);
      table.string('email', 100).nullable().defaultTo(null);
      table.string('name', 50).nullable();
     
      table.string('password', 500).nullable().defaultTo(null);
      table.string('token', 500).nullable().defaultTo(null);
      table.string('phn_no', 11).nullable().defaultTo(null);
    
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('clients');
  };
  
  