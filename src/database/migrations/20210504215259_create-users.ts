import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table
      .uuid('user_id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('cpf').unique().nullable();
    table.string('cnpj').unique().nullable();
    table.string('type').notNullable();
    table.string('password_hash').notNullable();
    table.date('createdAt').notNullable();
    table.date('updatedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
