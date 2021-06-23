import { Router } from 'express';

import { filesRoutes } from './files.routes';
import { ratingsRoutes } from './ratings.routes';
import { resevationsRoutes } from './reservations.routes';
import { restaurantsRoutes } from './restaurants.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/files', filesRoutes);
router.use('/ratings', ratingsRoutes);
router.use('/restaurants', restaurantsRoutes);
router.use('/reservations', resevationsRoutes);

export { router };
