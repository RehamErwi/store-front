import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const validateTokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers['authorization'] as string;
        if (typeof authorizationHeader !== 'undefined') {
            const bearer = authorizationHeader.split(' ')[1];
            jwt.verify(bearer, config.tokenSecret as unknown as string);
            next();
        } else {
            res.status(401).json({
                message: 'Failure! authorization header undefined',
            });
        }
    } catch (error) {
        res.status(401).json({
            message: 'Failure! Invalid token',
            error: error,
        });
    }
};

export default validateTokenMiddleware;
