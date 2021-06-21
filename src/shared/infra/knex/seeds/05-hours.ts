import { Knex } from 'knex';

const now = new Date();
const date = now.toISOString();
// add the rest later
const hours = [
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
];

export async function seed(knex: Knex): Promise<void> {
  await knex('hours').insert([
    {
      hour: hours[0],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[1],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[2],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[3],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[4],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[5],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[6],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[7],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[8],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[9],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[10],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[11],
      createdAt: date,
      updatedAt: date,
    },
    {
      hour: hours[12],
      createdAt: date,
      updatedAt: date,
    },
  ]);
}
