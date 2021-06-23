import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ratings', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .uuid('client_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table
      .uuid('restaurant_id')
      .notNullable()
      .references('id')
      .inTable('restaurants')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table.specificType('rating', 'smallint').unsigned().nullable();
    table.string('comment', 1000).unsigned().notNullable();

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
  return knex.schema.dropTable('rates');
}
