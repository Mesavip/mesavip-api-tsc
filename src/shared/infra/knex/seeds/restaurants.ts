import faker from 'faker';
import { db } from '../knex';

export async function seed_restaurants() {
  const restaurant = {
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    email: faker.internet.email(),
    password_hash: faker.internet.password(),
    cnpj: faker.datatype.number(),
    about: faker.lorem.paragraph(6),
    phone: faker.phone.phoneNumber(),
    site: faker.internet.domainName(),
    culinary: faker.lorem.words(2),
    tables_amount: 5,
    opening_hour: '19:30:00',
    closing_hour: '23:45:00',
  };

  await db('restaurants').insert(restaurant);
  return restaurant.id;
}
