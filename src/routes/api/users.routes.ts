import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import validateTokenMiddleware from '../../middleware/authMiddleware';

const routes = Router();

routes
    .route('/')
    .get(validateTokenMiddleware, controllers.getUsers)
    .post(controllers.createUser);
routes
    .route('/:id')
    .get(validateTokenMiddleware, controllers.getUser)
    .patch(validateTokenMiddleware, controllers.updateUser)
    .delete(validateTokenMiddleware, controllers.deleteUser);

// auth
routes.route('/authenticate').post(controllers.authenticate);

export default routes;
