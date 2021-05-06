import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('reservartions', (table) => {
    table
      .uuid('reservation_id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .uuid('client_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table
      .uuid('hour_id')
      .notNullable()
      .references('hour_id')
      .inTable('hours')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table
      .uuid('table_id')
      .notNullable()
      .references('table_id')
      .inTable('tables')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table.boolean('canceled').nullable();
    table.date('createdAt').notNullable();
    table.date('updatedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('reservartions');
}
