import {Request, Response, NextFunction, ErrorRequestHandler} from "express";
import { HttpException } from "../utils/exceptions";
import {JsonWebTokenError} from "jsonwebtoken";

export const errorMiddleware: ErrorRequestHandler = (err: any ,req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpException) {
        return res.status(err.status).send({
            message: err.message,
        });
    }

    if (err instanceof JsonWebTokenError) {
        return res.status(401).send({
            message: 'Unauthorized'
        })
    }

    return res.status(500).send({
        message: 'Server error'
    })
}