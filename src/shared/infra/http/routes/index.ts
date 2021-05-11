import { Router } from 'express';

import { filesRoutes } from './files.routes';
import { restaurantsRoutes } from './restaurants.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/files', filesRoutes);
router.use('/restaurants', restaurantsRoutes);

export { router };
