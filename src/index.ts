import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import { ordersRoutes } from './handler/order';
import { productsRoutes } from './handler/product';
import { usersRoutes } from './handler/user';

const PORT = config.port;
const app: Application = express();

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

export default app;
