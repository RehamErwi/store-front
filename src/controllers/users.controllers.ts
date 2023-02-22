import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/user.model';
import User from '../types/user.type';

type usersControllerTypes = {
    data: User | User[];
    message: string;
    res: Response;
    next: NextFunction;
};

const userModel = new UserModel();

const usersController = async ({
    data,
    message,
    res,
    next,
}: usersControllerTypes) => {
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

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await userModel.create(req.body);
    usersController({
        data: { ...data },
        message: 'Success! User has been created.',
        res: res,
        next: next,
    });
};

export const getUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await userModel.getUsers();
    usersController({
        data: data,
        message: 'Success! Users have been fetched.',
        res: res,
        next: next,
    });
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await userModel.getUser(req.params.id as unknown as string);
    usersController({
        data: data,
        message: 'Success! User has been fetched.',
        res: res,
        next: next,
    });
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await userModel.updateUser(req.body);
    usersController({
        data: data,
        message: 'Success! User has been updated.',
        res: res,
        next: next,
    });
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await userModel.deleteUser(req.params.id as unknown as string);
    usersController({
        data: data,
        message: 'Success! User has been deleted.',
        res: res,
        next: next,
    });
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
