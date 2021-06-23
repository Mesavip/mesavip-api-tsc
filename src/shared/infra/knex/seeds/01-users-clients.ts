import bcrypt from 'bcrypt';
import { Knex } from 'knex';
import 'dotenv/config';

// const now = new Date();
// const date = now.toISOString();
const client_ids = {
  1: '5526406b-9f8f-40fd-ab39-ed9a45d11663',
  2: '73bd4287-5a06-4428-9317-ee44eba124fe',
  3: 'cc4ece74-51a1-444c-8959-064d54a09914',
  4: 'f2bc17f4-d124-4432-88f1-e972765f997c',
  5: 'a5b407ab-5730-48ab-9016-11af93793149',
  6: 'eb9b523e-5290-436e-a93b-9972c7fadad3',
  7: '9a31d3d3-8203-49d7-9aa5-2e15c037c887',
  8: 'd3dd64b8-627d-4c49-ac56-0f7b9f729399',
  9: '3701c14a-17ac-4804-8fd0-a5d796bec2ee',
  10: 'cf83e71d-c129-41f3-af36-9a42bb25a38b',
};

const password_hash = bcrypt.hashSync('123456', 8);
const cpf = '12345678900';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').insert([
    {
      id: client_ids[1],
      name: 'Daniel Marques',
      email: 'daniel@gmail.com',
      cpf,
      type: 'CLI',
      password_hash,
    },
    {
      id: client_ids[2],
      name: 'Neymar Junior',
      email: 'neymar@gmail.com',
      cpf: cpf + 1,
      type: 'CLI',
      password_hash,
    },
    {
      id: client_ids[3],
      name: 'Cristiano Ronaldo',
      email: 'ronaldo@gmail.com',
      cpf: cpf + 2,
      type: 'CLI',
      password_hash,
    },
    {
      id: client_ids[4],
      name: 'Linus Torvalds',
      email: 'linus@gmail.com',
      cpf: cpf + 3,
      type: 'CLI',
      password_hash,
    },
    {
      id: client_ids[5],
      name: 'Antonio Carlos',
      email: 'antonio@gmail.com',
      cpf: cpf + 4,
      type: 'CLI',
      password_hash,
    },
    {
      id: client_ids[6],
      name: 'Claudia Marques',
      email: 'claudia@gmail.com',
      cpf: cpf + 5,
      type: 'CLI',
      password_hash,
    },
    {
      id: client_ids[7],
      name: 'Hercilia Amaral',
      email: 'cilu@gmail.com',
      cpf: cpf + 6,
      type: 'CLI',
      password_hash,
    },
    {
      id: client_ids[8],
      name: 'Marco Tomas',
      email: 'tomas@gmail.com',
      cpf: cpf + 7,
      type: 'CLI',
      password_hash,
    },
    {
      id: client_ids[9],
      name: 'Iracy Albuquerque',
      email: 'iracy@gmail.com',
      cpf: cpf + 8,
      type: 'CLI',
      password_hash,
    },
    {
      id: client_ids[10],
      name: 'Yolanda Miranda',
      email: 'yolanda@gmail.com',
      cpf: cpf + 9,
      type: 'CLI',
      password_hash,
    },
  ]);
}
