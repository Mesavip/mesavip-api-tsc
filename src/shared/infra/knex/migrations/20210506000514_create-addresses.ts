import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addresses', (table) => {
    table
      .uuid('address_id')
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

    table.string('bairro').notNullable();
    table.string('cidade').notNullable();
    table.string('estado').notNullable();
    table.string('cep').notNullable();
    table.string('logradouro').notNullable();
    table.string('numero').notNullable();
    table.string('complemento').nullable();

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
  return knex.schema.dropTable('addresses');
}
