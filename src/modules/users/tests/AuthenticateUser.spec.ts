import request from 'supertest';

import { app } from '../../../shared/infra/http/app';
import query from '../../../shared/infra/knex/knex';

describe('Authenticate User', () => {
  beforeAll(async () => {
    const user = {
      name: 'client',
      email: 'client@gmail.com',
      cpf: '123.456.789-00',
      password: '123456',
    };

    await request(app).post('/users/create').send(user);
  });

  afterAll(() => query('users').where({ email: 'client@gmail.com' }).delete());

  it('should be able to authenticate an user', async () => {
    const user = {
      email: 'client@gmail.com',
      password: '123456',
    };

    const response = await request(app)
      .post('/users/signin')
      .send(user)
      .then((response) => response.body);

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    const user = {
      email: 'false@gmail.com',
      password: '123456',
    };

    await request(app).post('/users/signin').send(user).expect(401);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user = {
      email: 'client@gmail.com',
      password: 'incorrect password',
    };

    await request(app).post('/users/signin').send(user).expect(401);
  });
});
