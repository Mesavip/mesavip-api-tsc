import { Router } from 'express';

import { ListAllRestaurantsController } from '../../../../modules/restaurants/useCases/listAllRestaurants/ListAllRestaurantsController';
import { ListHoursController } from '../../../../modules/restaurants/useCases/listHours/ListHoursController';
import { ListOneRestaurantController } from '../../../../modules/restaurants/useCases/listOneRestaurant/ListOneRestaurantController';
import { ListRatingsController } from '../../../../modules/restaurants/useCases/listRatings/ListRatingsController';
// import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const restaurantsRoutes = Router();

const listOneRestaurantController = new ListOneRestaurantController();
const listAllRestaurantsController = new ListAllRestaurantsController();
const listRatingsController = new ListRatingsController();
const listHoursController = new ListHoursController();

restaurantsRoutes.get('/', listAllRestaurantsController.handle);
restaurantsRoutes.get('/:restaurant_id', listOneRestaurantController.handle);
restaurantsRoutes.get('/ratings/:restaurant_id', listRatingsController.handle);
restaurantsRoutes.get('/hours/:restaurant_id', listHoursController.handle);

export { restaurantsRoutes };
