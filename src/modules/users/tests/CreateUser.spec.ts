import request from 'supertest';

import { app } from '../../../shared/infra/http/app';
import query from '../../../shared/infra/knex/knex';

describe('Create User', () => {
  beforeAll(() => query('users').where({ email: 'client@gmail.com' }).delete());
  afterAll(() => query('users').where({ email: 'client@gmail.com' }).delete());

  it('should be able to create an user', async () => {
    const user = {
      name: 'client',
      email: 'client@gmail.com',
      cpf: '123.456.789-00',
      password: '123456',
    };

    await request(app).post('/users/create').send(user).expect(201);
  });

  it('should not be able to create an user [cpf already registered]', async () => {
    const user = {
      name: 'client',
      email: 'client2@gmail.com',
      cpf: '123.456.789-00',
      password: '123456',
    };

    await request(app).post('/users/create').send(user).expect(401);
  });

  it('should not be able to create an user [email already registered]', async () => {
    const user = {
      name: 'client',
      email: 'client@gmail.com',
      cpf: '123.456.789-11',
      password: '123456',
    };

    await request(app).post('/users/create').send(user).expect(401);
  });
});
