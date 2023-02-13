import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/product.model';

const productModel = new ProductModel();

export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'Product created successfully!',
        });
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await productModel.getProducts();
        res.json({
            status: 'success',
            data: products,
            message: 'Products have been retrieved successfully',
        });
    } catch (err) {
        next(err);
    }
};

export const getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.getProduct(
            req.params.id as unknown as string
        );
        res.json({
            status: 'success',
            data: product,
            message: 'Product has been retrieved successfully',
        });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.updateProduct(req.body);
        res.json({
            status: 'success',
            data: product,
            message: 'Product has been updated successfully',
        });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.deleteProduct(
            req.params.id as unknown as string
        );
        res.json({
            status: 'success',
            data: product,
            message: 'product has been deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};
