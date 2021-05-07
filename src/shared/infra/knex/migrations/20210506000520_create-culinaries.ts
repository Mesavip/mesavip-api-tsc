import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('culinaries', (table) => {
    table
      .uuid('culinary_id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('name').notNullable();

    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(new Date().toLocaleString());
    table
      .timestamp('updatedAt')
      .notNullable()
      .defaultTo(new Date().toLocaleString());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('culinaries');
}
