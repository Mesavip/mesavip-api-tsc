import { db } from '../knex';
import faker from 'faker';
import bcrypt from 'bcrypt';

export async function seed_user() {
  const user = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    cpf: faker.datatype.number(),
    password_hash: bcrypt.hashSync('123456', 8),
  };

  await db('users').insert(user);
  return user.id;
}
