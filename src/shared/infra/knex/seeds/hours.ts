import { db } from '../knex';

const hours_array = [
  '19:30:00',
  '19:45:00',
  '20:00:00',
  '20:15:00',
  '20:30:00',
  '20:45:00',
  '21:00:00',
  '21:15:00',
  '21:30:00',
  '21:45:00',
  '22:00:00',
  '22:15:00',
  '22:30:00',
  '22:45:00',
  '23:00:00',
  '23:15:00',
  '23:30:00',
  '23:45:00',
];

export function seed_hours() {
  hours_array.forEach(async (hour) => await db('hours').insert({ hour: hour }));
}
