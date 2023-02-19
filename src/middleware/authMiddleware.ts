import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { Error } from './errorMiddleware';

const handleUnauthorizedError = (next: NextFunction) => {
    const error: Error = new Error('Login failed. Please try again');
    error.status = 401;
    next(error);
};

const validateToken = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers['Authorization'] as string;
    if (typeof authHeader === 'undefined') {
        handleUnauthorizedError(next);
    } else {
        const bearer = authHeader.split(' ')[1];
        const decode = jwt.verify(
            bearer,
            config.tokenSecret as unknown as string
        );
        if (!decode) {
            handleUnauthorizedError(next);
        } else {
            next();
        }
    }
};

const validateTokenMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        validateToken(req, _res, next);
    } catch (error) {
        handleUnauthorizedError(next);
    }
};

export default validateTokenMiddleware;