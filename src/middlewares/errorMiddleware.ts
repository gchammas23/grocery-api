import {Request, Response, NextFunction, ErrorRequestHandler} from "express";
import { HttpException } from "../utils/exceptions";

export const errorMiddleware: ErrorRequestHandler = (err: any ,req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpException) {
        return res.status(err.status).send({
            message: err.message,
        });
    } else {
        return res.status(500).send({
            message: 'Server error'
        })
    }
}