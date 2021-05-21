import 'dotenv/config';
import { resolve } from 'path';
// import pg from 'pg';

// pg.defaults.ssl = process.env.NODE_ENV === 'production';

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    ssl: { rejectUnauthorized: false },
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    extension: 'ts',
    tableName: 'knexmigrations',
    directory: resolve(
      __dirname,
      process.env.NODE_ENV === 'production' ? 'dist' : '',
      'src',
      'shared',
      'infra',
      'knex',
      'migrations'
    ),
  },
  seeds: {
    directory: resolve(
      __dirname,
      process.env.NODE_ENV === 'production' ? 'dist' : '',
      'src',
      'shared',
      'infra',
      'knex',
      'seeds'
    ),
  },
};
