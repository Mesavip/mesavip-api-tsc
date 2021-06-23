import { Knex } from 'knex';

const hours = [
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

export async function seed(knex: Knex): Promise<void> {
  await knex('hours').insert([
    {
      hour: hours[0],
    },
    {
      hour: hours[1],
    },
    {
      hour: hours[2],
    },
    {
      hour: hours[3],
    },
    {
      hour: hours[4],
    },
    {
      hour: hours[5],
    },
    {
      hour: hours[6],
    },
    {
      hour: hours[7],
    },
    {
      hour: hours[8],
    },
    {
      hour: hours[9],
    },
    {
      hour: hours[10],
    },
    {
      hour: hours[11],
    },
    {
      hour: hours[12],
    },
    {
      hour: hours[13],
    },
    {
      hour: hours[14],
    },
    {
      hour: hours[15],
    },
    {
      hour: hours[16],
    },
    {
      hour: hours[17],
    },
  ]);
}
