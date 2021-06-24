import request from 'supertest';

import { app } from '../../../shared/infra/http/app';
import query from '../../../shared/infra/knex/knex';

const restaurant_id = '3eb6cc7e-36f2-49af-b675-902cf3a0df36';
const time = '23:45';
const newDate = new Date();
const date = newDate.toDateString();

describe('Cancel reservation', () => {
  beforeEach(() => query('reservations').delete());
  afterEach(() => query('reservations').delete());

  it('should be able to cancel a reservation', async () => {
    const user = {
      email: 'daniel@gmail.com',
      password: '123456',
    };

    const { token } = await request(app)
      .post('/users/signin')
      .send(user)
      .then((response) => response.body);

    const { id: reservation_id } = await request(app)
      .post('/reservations/create')
      .send({ restaurant_id, date, time })
      .set({ Authorization: `Bearer ${token}` })
      .then((response) => response.body.id);

    console.log(reservation_id);

    await request(app)
      .delete(`/reservations/cancel/${reservation_id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((response) => response.body.canceled === true);
  });
});
