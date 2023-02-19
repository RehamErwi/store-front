import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/user.model';

const userModel = new UserModel();

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...user },
            message: 'User has been created successfully!',
        });
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await userModel.getUsers();
        res.json({
            status: 'success',
            data: users,
            message: 'Users have been retrieved successfully!',
        });
    } catch (err) {
        next(err);
    }
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.getUser(
            req.params.id as unknown as string
        );
        res.json({
            status: 'success',
            data: user,
            message: 'User has been retrieved successfully!',
        });
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.updateUser(req.body);
        res.json({
            status: 'success',
            data: user,
            message: 'User has been updated successfully!',
        });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.deleteUser(
            req.params.id as unknown as string
        );
        res.json({
            status: 'success',
            data: user,
            message: 'User has been deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
};

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.authenticate(email, password);
        const token = jwt.sign(
            { user },
            config.tokenSecret as unknown as string
        );
        if (!user) {
            res.status(401).json({
                status: 'error',
                message: 'Username and password do not match!',
            });
        }
        return res.json({
            status: 'success',
            data: { ...user, token },
            message: 'User has been authenticated successfully!',
        });
    } catch (err) {
        return next(err);
    }
};