
const Pool = require('pg').Pool;
const env = require("dotenv");
env.config();
const dbConfig = {
    user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};
const pool = new Pool(dbConfig);
module.exports = pool;