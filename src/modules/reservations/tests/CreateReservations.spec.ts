/* eslint-disable no-await-in-loop */
import request from 'supertest';

import { app } from '../../../shared/infra/http/app';
import query from '../../../shared/infra/knex/knex';

const restaurant_id = '3eb6cc7e-36f2-49af-b675-902cf3a0df36';
const time = '23:45';
const newDate = new Date();
const date = newDate.toDateString();

describe('Create a reservation', () => {
  beforeEach(async () => query('reservations').delete());
  afterAll(() => query('reservations').delete());

  it('should be able to create a reservation', async () => {
    const user = {
      email: 'daniel@gmail.com',
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
      email: 'daniel@gmail.com',
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
