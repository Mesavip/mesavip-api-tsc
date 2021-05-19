import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('reservations', (table) => {
    table.date('date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('reservations', (table) => {
    table.dropColumn('date');
  });
}
