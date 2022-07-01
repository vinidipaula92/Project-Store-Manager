const mysql2 = require('mysql2/promise');
require('dotenv').config();

const connection = mysql2.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  port: process.env.MYSQL_PORT || 3306,
});

module.exports = connection;