import request from 'supertest';

import { app } from '../../../shared/infra/http/app';
import query from '../../../shared/infra/knex/knex';

let reservation_id: string;
const restaurant_id = '3eb6cc7e-36f2-49af-b675-902cf3a0df36';
const hour_id = '6144d7d9-543a-44b0-98e2-5874109b60dd';
const newDate = new Date();
const date = newDate.toISOString();

describe('Cancel reservation', () => {
  beforeEach(() => query('reservations').delete());
  afterEach(() => query('reservations').delete());

  it('should be able to cancel a reservation', async () => {
    const user = {
      email: 'client@gmail.com',
      password: '123456',
    };

    const { token } = await request(app)
      .post('/users/signin')
      .send(user)
      .then((response) => response.body);

    reservation_id = await request(app)
      .post(`/reservations/create/${restaurant_id}/${hour_id}/${date}`)
      .set({ Authorization: `Bearer ${token}` })
      .then((response) => response.body.reservation_id);

    await request(app)
      .delete(`/reservations/cancel/${reservation_id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((response) => response.body.canceled === true);
  });
});
