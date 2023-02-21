import { NextFunction, Request, Response } from 'express';
import OrderModel from '../models/order.model';

const orderModel = new OrderModel();

export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await orderModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...order },
            message: 'Order created successfully!',
        });
    } catch (error) {
        next(error);
    }
};

export const createOrderDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orderDetails = await orderModel.addToOrder(req.body);
        res.json({
            status: 'success',
            data: { ...orderDetails },
            message: 'Order details created successfully!',
        });
    } catch (error) {
        next(error);
    }
};

export const getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await orderModel.getOrders(
            req.params.id as unknown as string
        );

        res.json({
            status: 'success',
            data: orders,
            message: 'Orders have been retrieved successfully',
        });
    } catch (err) {
        next(err);
    }
};

export const getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await orderModel.getOrder(
            req.params.id as unknown as string
        );
        res.json({
            status: 'success',
            data: order,
            message: 'Order has been retrieved successfully',
        });
    } catch (err) {
        next(err);
    }
};

export const getOrderDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await orderModel.getOrderDetails(
            req.params.id as unknown as string
        );
        res.json({
            status: 'success',
            data: order,
            message: 'Order has been retrieved successfully',
        });
    } catch (err) {
        next(err);
    }
};

export const deleteOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await orderModel.deleteOrder(
            req.params.id as unknown as string
        );
        res.json({
            status: 'success',
            data: order,
            message: 'Order has been deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};
