import {Request, Response, NextFunction, ErrorRequestHandler} from "express";
import { HttpException } from "../utils/exceptions";
import {JsonWebTokenError} from "jsonwebtoken";

// This middleware will handle any error thrown within the application
export const errorMiddleware: ErrorRequestHandler = (err: any ,req: Request, res: Response, _next: NextFunction) => {
    // Handle custom exceptions
    if (err instanceof HttpException) {
        return res.status(err.status).send({
            message: err.message,
        });
    }

    // Throw an unauthorized exception for any error related to JWT
    if (err instanceof JsonWebTokenError) {
        return res.status(401).send({
            message: 'Unauthorized'
        })
    }

    // Handle any other exception
    return res.status(500).send({
        message: 'Server error'
    })
}