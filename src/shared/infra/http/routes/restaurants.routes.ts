import { Router } from 'express';

import { ListAllRestaurants } from '../../../../modules/restaurants/ListAllRestaurants';
import { ListAvailableHours } from '../../../../modules/restaurants/ListAvailableHours';
import { ListRestaurantById } from '../../../../modules/restaurants/ListRestaurantById';
import { ListCuisines } from '../../../../modules/restaurants/ListCuisines';

const restaurantsRoutes = Router();

const listRestaurantById = new ListRestaurantById();
const listAllRestaurants = new ListAllRestaurants();
const listAvailableHours = new ListAvailableHours();
const listCuisines = new ListCuisines();

restaurantsRoutes.get('/list-all', listAllRestaurants.execute);
restaurantsRoutes.get('/list-by-id/:restaurant_id', listRestaurantById.execute);
restaurantsRoutes.get('/cuisines/list', listCuisines.execute);

restaurantsRoutes.get(
  '/available-hours/:restaurant_id/:date',
  listAvailableHours.execute
);

export { restaurantsRoutes };
