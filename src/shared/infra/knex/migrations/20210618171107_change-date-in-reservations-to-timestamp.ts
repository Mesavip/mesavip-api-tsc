import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('reservations', (table) => {
    table.timestamp('date').notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('reservations', (table) => {
    table.date('date').notNullable().alter();
  });
}
