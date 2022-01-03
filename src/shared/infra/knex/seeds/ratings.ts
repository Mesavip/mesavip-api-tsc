import faker from 'faker';
import { db } from '../knex';

export async function seed_ratings() {
  const reservations = await db('reservations')
    .select(['id as reservation_id', 'restaurant_id', 'client_id'])
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
