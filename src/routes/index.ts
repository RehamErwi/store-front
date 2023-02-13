import { Router } from 'express';
import ordersRoutes from './api/orders.routes';
import productsRoutes from './api/products.routes';
import usersRoutes from './api/users.routes';
const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
