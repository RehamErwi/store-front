import { Application, NextFunction, Request, Response } from 'express';
import validateTokenMiddleware from '../middleware/authMiddleware';
import OrderModel, { Order, OrderDetails } from '../models/order';

type ordersControllerTypes = {
    data: Order | Order[] | OrderDetails | OrderDetails[];
    message: string;
    res: Response;
    next: NextFunction;
};

const orderModel = new OrderModel();

const ordersController = async ({
    data,
    message,
    res,
    next,
}: ordersControllerTypes) => {
    try {
        const d = data;
        res.json({
            status: 'success',
            data: d,
            message: message,
        });
    } catch (error) {
        next(error);
    }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const data = await orderModel.create(req.body);

    ordersController({
        data: { ...data },
        message: 'Success! New order has been created.',
        res: res,
        next: next,
    });
};

const createOrderDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await orderModel.addToOrder(req.body);

    ordersController({
        data: { ...data },
        message: 'Success! Order details has been created.',
        res: res,
        next: next,
    });
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const data = await orderModel.getOrders(req.params.id as unknown as string);

    ordersController({
        data: data,
        message: 'Success! Orders have been created.',
        res: res,
        next: next,
    });
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    const data = await orderModel.getOrder(req.params.id as unknown as string);

    ordersController({
        data: data,
        message: 'Success! Order has been fetched.',
        res: res,
        next: next,
    });
};

const getOrderDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await orderModel.getOrderDetails(
        req.params.id as unknown as string
    );

    ordersController({
        data: data,
        message: 'Success! Order details have been fetched.',
        res: res,
        next: next,
    });
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id as unknown as string;
    const data = await orderModel.deleteOrder(orderId);

    ordersController({
        data: data,
        message: 'Success! Order has been deleted.',
        res: res,
        next: next,
    });
};

export const ordersRoutes = (app: Application) => {
    app.post('/orders/', createOrder);
    app.get('/orders/:id', validateTokenMiddleware, getOrders);
    app.get('/orders/single/:id', validateTokenMiddleware, getOrder);
    app.post('/orders/details', createOrderDetails);
    app.get('/orders/details/:id', getOrderDetails);
    app.delete('/orders/:id', validateTokenMiddleware, deleteOrder);
};
