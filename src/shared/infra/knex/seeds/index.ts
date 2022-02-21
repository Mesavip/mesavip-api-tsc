import { seed_user } from './users';
import { seed_restaurants } from './restaurants';
import { seed_hours } from './hours';
import { seed_address } from './addresses';
import { seed_reservations } from './reservations';
import { seed_ratings } from './ratings';
import { seed_files } from './files';
// import { clear_data } from './clear-data';

async function seed_users_and_restaurants() {
  for (let index = 0; index < 20; index++) {
    await seed_user();
    const restaurant_id = await seed_restaurants();
    await seed_address(restaurant_id);
  }
}

async function seed_reservations_ratings_files_and_hours() {
  await seed_reservations();
  await seed_ratings();
  await seed_files();
  seed_hours();
}

async function main() {
  await seed_users_and_restaurants();
  await seed_reservations_ratings_files_and_hours();
}

main();
// clear_data();
