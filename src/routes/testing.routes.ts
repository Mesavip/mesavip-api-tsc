import { Router } from 'express';

import { Testing } from '../app/controllers/Testing';

const testingRoutes = Router();

const testing = new Testing();

testingRoutes.get('/list', testing.index);
testingRoutes.post('/create', testing.store);

export { testingRoutes };
