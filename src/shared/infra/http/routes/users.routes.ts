import { Router } from 'express';

import { AuthenticateUserController } from '../../../../modules/users/useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '../../../../modules/users/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/create', createUserController.handle);
usersRoutes.post('/login', authenticateUserController.handle);

export { usersRoutes };
