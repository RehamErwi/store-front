import { Application, NextFunction, Request, Response } from 'express';
import validateTokenMiddleware from '../middleware/authMiddleware';
import ProductModel, { Product } from '../models/product';

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

const createProduct = async (
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

const getProducts = async (
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

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
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

const updateProduct = async (
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

const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const productId = req.params.id as unknown as string;
    const data = await productModel.deleteProduct(productId);

    productsController({
        data: data,
        message: 'Success! Product has been removed.',
        res: res,
        next: next,
    });
};

export const productsRoutes = (app: Application) => {
    app.post('/products', validateTokenMiddleware, createProduct);
    app.get('/products', validateTokenMiddleware, getProducts);
    app.get('/products/:id', validateTokenMiddleware, getProduct);
    app.patch('/products/:id', validateTokenMiddleware, updateProduct);
    app.delete('/products/:id', validateTokenMiddleware, deleteProduct);
};
