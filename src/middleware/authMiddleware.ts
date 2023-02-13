import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { Error } from './errorMiddleware';

const handleUnauthorizedError = (next: NextFunction) => {
    const error: Error = new Error('Login failed. Please try again');
    error.status = 401;
    next(error);
};

const validateTokenMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLocaleLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decode = jwt.verify(
                    token,
                    config.tokenSecret as unknown as string
                );
                if (decode) {
                    next();
                } else {
                    handleUnauthorizedError(next);
                }
            }
        } else {
            handleUnauthorizedError(next);
        }
    } catch (error) {
        handleUnauthorizedError(next);
    }
};

export default validateTokenMiddleware;
