/* eslint-disable no-await-in-loop */
import request from 'supertest';

import { app } from '../../../shared/infra/http/app';
import query from '../../../shared/infra/knex/knex';

const restaurant_id = 'feb8dfc9-de5f-4c42-b7d9-da42a258b9a8';
const newDate = new Date();
const time = '23:45';
const date = newDate.toDateString();

describe('Create a reservation', () => {
  beforeEach(async () => {
    await query('reservations').delete();

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
      .post('/reservations/create')
      .send({ restaurant_id, date, time })
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
        .post('/reservations/create')
        .send({ restaurant_id, date, time })
        .set({ Authorization: `Bearer ${token}` })
        .then((response) => response.status);
    } while ((await response) === 201);

    // After there is no longer any table available for reserving in that date
    // and time, the request below should return a 403, since it couldn't reserve

    await request(app)
      .post('/reservations/create')
      .send({ restaurant_id, date, time })
      .set({ Authorization: `Bearer ${token}` })
      .expect(404);
  });
});
