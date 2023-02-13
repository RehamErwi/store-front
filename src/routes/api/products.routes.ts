import { Router } from 'express';
import * as controllers from '../../controllers/products.controllers';
import validateTokenMiddleware from '../../middleware/authMiddleware';

const routes = Router();

routes
    .route('/')
    .get(validateTokenMiddleware, controllers.getProducts)
    .post(controllers.createProduct);
routes
    .route('/:id')
    .get(validateTokenMiddleware, controllers.getProduct)
    .patch(validateTokenMiddleware, controllers.updateProduct)
    .delete(validateTokenMiddleware, controllers.deleteProduct);

export default routes;
