/* eslint-disable no-await-in-loop */
import request from 'supertest';

import { app } from '../../../shared/infra/http/app';
import query from '../../../shared/infra/knex/knex';

const restaurant_id = '3eb6cc7e-36f2-49af-b675-902cf3a0df36';
const hour_id = '6144d7d9-543a-44b0-98e2-5874109b60dd';
const newDate = new Date();
const date = newDate.toISOString();

describe('Create a reservation', () => {
  beforeEach(async () => {
    query('reservations').delete();

    const user = {
      name: 'client',
      email: 'client@gmail.com',
      cpf: '123.456.789-00',
      password: '123456',
    };

    await request(app).post('/users/create').send(user);
  });
  afterAll(() => query('reservations').delete());

  it('should be able to create a reservation', async () => {
    const user = {
      email: 'client@gmail.com',
      password: '123456',
    };

    const { token } = await request(app)
      .post('/users/signin')
      .send(user)
      .then((response) => response.body);

    await request(app)
      .post(`/reservations/create/${restaurant_id}/${hour_id}/${date}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201);
  });

  it('should not be able to create a reservation', async () => {
    const user = {
      email: 'client@gmail.com',
      password: '123456',
    };

    const { token } = await request(app)
      .post('/users/signin')
      .send(user)
      .then((response) => response.body);

    // The do...while below will run until there is no longer any table
    // in that date and time available for reserving.

    let response;

    do {
      response = request(app)
        .post(`/reservations/create/${restaurant_id}/${hour_id}/${date}`)
        .set({ Authorization: `Bearer ${token}` })
        .then((response) => response.status);
    } while ((await response) === 201);

    // After there is no longer any table available for reserving in that date
    // and time, the request below should return a 403, since it couldn't reserve

    await request(app)
      .post(`/reservations/create/${restaurant_id}/${hour_id}/${date}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(403);
  });
});
