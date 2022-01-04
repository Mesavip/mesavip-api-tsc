import { db } from '../knex';
import faker from 'faker';
import {
  files_banner,
  files_gallery,
  files_list,
} from './test-user/files-data';

enum file_type {
  banner = 'banner',
  gallery = 'gallery',
  list = 'list',
}

async function create_files({ restaurant_id, type, path }: any) {
  const file = {
    path,
    restaurant_id,
    public_id: faker.datatype.uuid(),
    type,
  };

  await db('files').insert(file);
}

export async function seed_files() {
  const restaurants = await db('restaurants').select('id');

  restaurants.map(async (restaurant, index) => {
    files_gallery.map(async (file) => {
      await create_files({
        restaurant_id: restaurant.id,
        type: file_type.gallery,
        path: file,
      });
    });

    await create_files({
      restaurant_id: restaurant.id,
      type: file_type.banner,
      path: files_banner[index],
    });

    await create_files({
      restaurant_id: restaurant.id,
      type: file_type.list,
      path: files_list[index],
    });
  });
}
