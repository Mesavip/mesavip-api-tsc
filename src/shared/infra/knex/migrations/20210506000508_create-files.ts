import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('files', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .uuid('restaurant_id')
      .notNullable()
      .references('id')
      .inTable('restaurants')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table.string('path').unique().notNullable();
    table.string('public_id').notNullable();
    table.string('type').notNullable();

    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.raw('transaction_timestamp()'));
    table
      .timestamp('updatedAt')
      .notNullable()
      .defaultTo(knex.raw('transaction_timestamp()'));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('files');
}
