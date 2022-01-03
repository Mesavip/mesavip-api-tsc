import faker from 'faker';
import { db } from '../knex';

export function past_reservation({ client_id, restaurant_id }: any) {
  return {
    id: faker.datatype.uuid(),
    client_id,
    restaurant_id,
    date: faker.date.past(),
    time: '20:00:00',
  };
}

export function future_reservation({ client_id, restaurant_id }: any) {
  return {
    id: faker.datatype.uuid(),
    client_id,
    restaurant_id,
    date: faker.date.future(),
    time: '20:00:00',
  };
}

export async function seed_reservations() {
  const users = await db('users').select('id');
  const restaurants = await db('restaurants').select('id');

  restaurants.forEach((restaurant) => {
    users.forEach(async (user) => {
      const data = { client_id: user.id, restaurant_id: restaurant.id };

      await db('reservations').insert(past_reservation(data));
      await db('reservations').insert(future_reservation(data));
    });
  });
}
