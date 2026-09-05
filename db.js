const sql = require('mssql');
require('dotenv').config();

const config = {
  //user: process.env.DB_USER,
  //password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false, // set true if using Azure SQL
    trustServerCertificate: true // needed for local dev
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('DB connection failed:', err);
    throw err;
  });

module.exports = { sql, poolPromise };
