import { Router } from 'express';
import * as controllers from '../../controllers/orders.controllers';
import validateTokenMiddleware from '../../middleware/authMiddleware';

const routes = Router();

routes.route('/').post(controllers.createOrder);
routes.route('/details').post(controllers.createOrderDetails);
routes.route('/details/:id').get(controllers.getOrderDetails);

routes
    .route('/:id')
    .get(validateTokenMiddleware, controllers.getOrders)
    // .patch(validateTokenMiddleware, controllers.updateOrder)
    .delete(validateTokenMiddleware, controllers.deleteOrder);
routes.route('/single/:id').get(validateTokenMiddleware, controllers.getOrder);

export default routes;
