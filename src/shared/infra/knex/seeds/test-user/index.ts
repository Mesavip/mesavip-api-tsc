import { db } from '../../knex';
import faker from 'faker';
import bcrypt from 'bcrypt';
import { future_reservation, past_reservation } from '../reservations';

async function seed_user() {
  const user = {
    id: faker.datatype.uuid(),
    name: 'Daniel Marques',
    email: 'daniel@gmail.com',
    cpf: faker.datatype.number(),
    password_hash: bcrypt.hashSync('123456', 8),
  };

  await db('users').insert(user);
  return user.id;
}

async function seed_reservations(client_id: string) {
  const restaurants = await db('restaurants').select('id');

  restaurants.forEach(async (restaurant) => {
    const data = { client_id, restaurant_id: restaurant.id };

    await db('reservations').insert(past_reservation(data));
    await db('reservations').insert(future_reservation(data));
  });
}

async function seed_ratings(client_id: string) {
  const reservations = await db('reservations')
    .select(['id as reservation_id', 'restaurant_id', 'client_id'])
    .where({ client_id })
    .andWhereRaw(`concat(date,' ', time)::timestamp < now()`);

  reservations.forEach(async (reservation) => {
    const rating = {
      ...reservation,
      rating: faker.datatype.number({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
    };

    await db('ratings').insert(rating);
    await db('reservations').where({ id: rating.reservation_id }).update({
      rated: true,
    });
  });
}

async function seed_test_user() {
  const client_id = await seed_user();
  await seed_reservations(client_id);
  await seed_ratings(client_id);
}

seed_test_user();
