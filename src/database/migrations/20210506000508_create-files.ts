import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('files', (table) => {
    table
      .uuid('file_id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .uuid('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table.string('path').unique().notNullable();
    table.string('public_id').notNullable();
    table.string('type').notNullable();
    table.date('createdAt').notNullable();
    table.date('updatedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('files');
}
