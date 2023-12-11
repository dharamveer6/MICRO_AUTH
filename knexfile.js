require('dotenv').config();

console.log(process.env.db_hostname)
module.exports={
  
  development: {
    client: 'mysql2',
    connection: {
      host:"localhost",
      user:"root",
      password:"8421",
      database:"brain_auth",
      port:3301
    },
    migrations: {
      directory: './migrations'
    },
    
    pool: {
      min: 2, 
      max: 10, // Maximum number of connections in the pool
      idleTimeoutMillis: 10000, // How long a connection is allowed to be idle before it's closed
      acquireTimeoutMillis: 30000, // How long to wait for a connection from the pool before timing out
    },
   
  },
};