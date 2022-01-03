import faker from 'faker';
import { db } from '../knex';

export async function seed_address(restaurant_id: string) {
  const address = {
    bairro: faker.address.county(),
    cidade: faker.address.city(),
    estado: faker.address.state(),
    cep: faker.address.zipCode(),
    logradouro: faker.address.streetName(),
    numero: faker.datatype.number(),
    restaurant_id,
  };

  await db('addresses').insert(address);
}
