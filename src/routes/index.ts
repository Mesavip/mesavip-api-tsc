import { Router } from 'express';

import { testingRoutes } from './testing.routes';

const router = Router();

router.use('/users', testingRoutes);

export { router };
