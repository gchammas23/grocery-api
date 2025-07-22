import {Request, Response, NextFunction} from "express";
import {UnauthorizedException} from "../utils/exceptions";
import jwt, {JwtPayload} from "jsonwebtoken";
import config from "../utils/config";
import db from "../db";

// Add an extension to the Request object to add the userId into it for easier access when the user is logged in
declare global {
    namespace Express {
        interface Request {
            userId: number;
        }
    }
}

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exception: UnauthorizedException = new UnauthorizedException();

        // No authorization headers provided
        if (!req.headers.authorization) {
            throw exception;
        }
        const decoded: JwtPayload = jwt.verify(req.headers.authorization.split(' ')[1], config.jwt.secret as string) as JwtPayload;
        if (!decoded) {
            throw exception; // Could not properly decode the Jwt
        }
        if ('uid' in decoded) {
            // Look up user by its id
            const user = await db('users').where({ id: decoded.uid }).first();
            if (!user) {
                throw exception;
            }
            //User found and token is valid, we can proceed with the request
            req.userId = decoded.uid; // Set the userId to be the current user's id to be used in requests
            return next();
        }
        throw exception; // Decoded token does not contain expected payload
    } catch (e) {
        next(e);
    }
}