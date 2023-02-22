import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/product.model';
import Product from '../types/product.type';

type productsControllerTypes = {
    data: Product | Product[];
    message: string;
    res: Response;
    next: NextFunction;
};

const productModel = new ProductModel();

const productsController = async ({
    data,
    message,
    res,
    next,
}: productsControllerTypes) => {
    try {
        res.json({
            status: 'success',
            data: data,
            message: message,
        });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await productModel.create(req.body);

    productsController({
        data: { ...data },
        message: 'Success! New product has been added.',
        res: res,
        next: next,
    });
};

export const getProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await productModel.getProducts();

    productsController({
        data: data,
        message: 'Success! Products have been fetched.',
        res: res,
        next: next,
    });
};

export const getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await productModel.getProduct(
        req.params.id as unknown as string
    );

    productsController({
        data: data,
        message: 'Success! Product has been fetched.',
        res: res,
        next: next,
    });
};

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await productModel.updateProduct(req.body);

    productsController({
        data: data,
        message: 'Success! Product has been updated.',
        res: res,
        next: next,
    });
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await productModel.deleteProduct(
        req.params.id as unknown as string
    );

    productsController({
        data: data,
        message: 'Success! Product has been removed.',
        res: res,
        next: next,
    });
};
