import { Router } from 'express';

import { CreateUserController } from '../../../../modules/users/useCases/CreateUserController';
import { ListUserUseCase } from '../../../../modules/users/useCases/ListUserUseCase';

const userRoutes = Router();

const listUserUseCase = new ListUserUseCase();
const createUserController = new CreateUserController();

userRoutes.get('/list', listUserUseCase.handle);
userRoutes.post('/create', createUserController.handle);

export { userRoutes };
