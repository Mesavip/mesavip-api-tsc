import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('restaurants', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .uuid('restaurant_id')
      .notNullable()
      .unique()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table
      .uuid('culinary_id')
      .notNullable()
      .references('culinary_id')
      .inTable('culinaries')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table.string('about', 1000).notNullable();
    table.string('phone').notNullable();
    table.string('site').notNullable();
    table.date('createdAt').notNullable();
    table.date('updatedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('restaurants');
}
