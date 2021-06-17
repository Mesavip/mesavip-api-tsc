import { Knex } from 'knex';

const culinary_ids = {
  1: '6f89d28e-b7bd-4c06-8d12-8dbd1efe1155',
  2: 'af486eb0-6eaa-4d8c-a028-62ed8c9e73f0',
  3: '92e9459b-dd33-4e65-92aa-bc9bd9e3c1db',
  4: 'eb5a300a-b425-468a-98a6-22250767da9f',
  5: 'd93ea51a-fab7-4234-b48d-087022631801',
  6: '35d2d435-3439-479d-a4dc-53ad0e82b504',
  7: '16a575f1-7ff7-45fe-a261-00cad902fcbd',
  8: '7a214914-f473-45bb-af3f-88d0dcf91850',
  9: '3219af3d-472e-4897-91ea-c5121784224c',
  10: 'bb6bb88a-9ca4-439e-83c7-c5febd2bfbaf',
  11: 'c8360280-7df2-4cf7-8d11-c8a1f3fc0b44',
};

export async function seed(knex: Knex): Promise<void> {
  await knex('culinaries').insert([
    {
      culinary_id: culinary_ids[1],
      name: 'Brasileira',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      culinary_id: culinary_ids[2],
      name: 'Americana',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      culinary_id: culinary_ids[3],
      name: 'Vegana',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      culinary_id: culinary_ids[4],
      name: 'Vegetariana',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      culinary_id: culinary_ids[5],
      name: 'Mineira',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      culinary_id: culinary_ids[6],
      name: 'Baiana',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      culinary_id: culinary_ids[7],
      name: 'Indiana',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      culinary_id: culinary_ids[8],
      name: 'Japonesa',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      culinary_id: culinary_ids[9],
      name: 'Italiana',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      culinary_id: culinary_ids[10],
      name: 'Chinesa',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      culinary_id: culinary_ids[11],
      name: 'Churrascaria',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
