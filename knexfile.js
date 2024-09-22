/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'your_database_name',
  },
  migrations: {
    directory: './src/db/migrations',
  },
};
