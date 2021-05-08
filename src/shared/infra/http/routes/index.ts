import { Router } from 'express';

import { restaurantsRoutes } from './restaurants.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/restaurants', restaurantsRoutes);

export { router };
