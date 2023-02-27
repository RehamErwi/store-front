import { Application, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import validateTokenMiddleware from '../middleware/authMiddleware';
import UserModel, { User } from '../models/user';

type usersControllerTypes = {
    data: User | User[];
    message: string;
    res: Response;
    next: NextFunction;
    errorMessage?: Error;
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
        return next(error);
    }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const data = await userModel.create(req.body);
    usersController({
        data: { ...data },
        message: 'Success! User has been created.',
        res: res,
        next: next,
    });
};

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    const data = await userModel.getUsers();
    usersController({
        data: data,
        message: 'Success! Users have been fetched.',
        res: res,
        next: next,
    });
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const data = await userModel.getUser(req.params.id as unknown as string);
    usersController({
        data: data,
        message: 'Success! User has been fetched.',
        res: res,
        next: next,
    });
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const data = await userModel.updateUser(req.body);
    usersController({
        data: data,
        message: 'Success! User has been updated.',
        res: res,
        next: next,
    });
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as unknown as string;
    const data = await userModel.deleteUser(userId);

    usersController({
        data: data,
        message: 'Success! User has been deleted.',
        res: res,
        next: next,
    });
};

const authenticate = async (
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
                message: 'Failure! Email and password do not match!',
            });
        }
        return res.json({
            status: 'success',
            data: { ...user, token },
            message: 'Success! User has been authenticated',
        });
    } catch (err) {
        return next(err);
    }
};

export const usersRoutes = (app: Application) => {
    app.get('/users', validateTokenMiddleware, getUsers);
    app.post('/users', createUser);
    app.get('/users/:id', validateTokenMiddleware, getUser);
    app.patch('/users/:id', validateTokenMiddleware, updateUser);
    app.delete('/users/:id', validateTokenMiddleware, deleteUser);
    app.post('/users/authenticate', authenticate);
};
