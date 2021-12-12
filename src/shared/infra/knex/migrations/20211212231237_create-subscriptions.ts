import { Knex } from 'knex';
import { db } from '../knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subscriptions', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table.enu('tier', ['standard', 'premium'], {
      useNative: true,
      enumName: 'subscription_tier_type',
    });

    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table
      .uuid('price_id')
      .notNullable()
      .references('id')
      .inTable('prices')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table
      .timestamp('start_date')
      .notNullable()
      .defaultTo(knex.raw('transaction_timestamp()'));

    table
      .timestamp('end_date')
      .notNullable()
      .defaultTo(knex.raw('transaction_timestamp()'));

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
  return knex.schema.dropTable('subscriptions');
}
