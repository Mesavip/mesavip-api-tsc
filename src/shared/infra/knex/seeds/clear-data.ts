import { db } from '../knex';

export async function clear_data() {
  await db('files').delete();
  await db('ratings').delete();
  await db('reservations').delete();
  await db('addresses').delete();
  await db('hours').delete();
  await db('restaurants').delete();
  await db('users').delete();
}
