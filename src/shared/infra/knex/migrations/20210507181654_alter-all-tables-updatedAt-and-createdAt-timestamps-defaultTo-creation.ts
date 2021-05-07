import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void[]> {
  return Promise.all([
    knex.schema.alterTable('users', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
    }),
    knex.schema.alterTable('hours', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
    }),
    knex.schema.alterTable('tables', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
    }),
    knex.schema.alterTable('reservations', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
    }),
    knex.schema.alterTable('files', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
    }),
    knex.schema.alterTable('addresses', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
    }),
    knex.schema.alterTable('culinaries', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
    }),
    knex.schema.alterTable('rates', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
    }),
    knex.schema.alterTable('comments', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
    }),
    knex.schema.alterTable('restaurants', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(knex.raw('transaction_timestamp()'))
        .alter();
    }),
  ]);
}

export async function down(knex: Knex): Promise<void[]> {
  return Promise.all([
    knex.schema.alterTable('users', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
    }),
    knex.schema.alterTable('hours', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
    }),
    knex.schema.alterTable('tables', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
    }),
    knex.schema.alterTable('reservations', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
    }),
    knex.schema.alterTable('files', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
    }),
    knex.schema.alterTable('addresses', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
    }),
    knex.schema.alterTable('culinaries', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
    }),
    knex.schema.alterTable('rates', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
    }),
    knex.schema.alterTable('comments', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
    }),
    knex.schema.alterTable('restaurants', (table) => {
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
      table
        .timestamp('updatedAt')
        .notNullable()
        .defaultTo(new Date().toLocaleString())
        .alter();
    }),
  ]);
}
