import { config } from 'dotenv';
import { Knex } from 'knex';
import * as path from 'path';

config();

const knexConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: path.resolve(__dirname, '../../db/migrations'), // Path ke folder migrasi
  },
};

export default knexConfig;
