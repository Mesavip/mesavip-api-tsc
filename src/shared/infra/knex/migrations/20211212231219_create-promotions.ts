import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('promotions', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .timestamp('start_date')
      .notNullable()
      .defaultTo(knex.raw('transaction_timestamp()'));

    table
      .timestamp('end_date')
      .notNullable()
      .defaultTo(knex.raw('transaction_timestamp()'));

    table.integer('discount_percentage').notNullable();

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
  return knex.schema.dropTable('promotions');
}
