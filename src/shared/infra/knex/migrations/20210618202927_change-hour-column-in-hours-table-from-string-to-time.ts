import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('hours', (table) => {
    table.time('hour').notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('hours', (table) => {
    table.string('hour').notNullable().alter();
  });
}
