import { NextFunction, Request, Response } from 'express';
import OrderModel from '../models/order.model';
import Order from '../types/order.type';
import OrderDetails from '../types/orderDetails.type';

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

export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await orderModel.create(req.body);

    ordersController({
        data: { ...data },
        message: 'Success! New order has been created.',
        res: res,
        next: next,
    });
};

export const createOrderDetails = async (
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

export const getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await orderModel.getOrders(req.params.id as unknown as string);

    ordersController({
        data: data,
        message: 'Success! Orders have been created.',
        res: res,
        next: next,
    });
};

export const getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await orderModel.getOrder(req.params.id as unknown as string);

    ordersController({
        data: data,
        message: 'Success! Order has been fetched.',
        res: res,
        next: next,
    });
};

export const getOrderDetails = async (
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

export const deleteOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await orderModel.deleteOrder(
        req.params.id as unknown as string
    );

    ordersController({
        data: data,
        message: 'Success! Order has been deleted.',
        res: res,
        next: next,
    });
};
