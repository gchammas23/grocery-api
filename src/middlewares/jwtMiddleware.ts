import {Request, Response, NextFunction} from "express";
import {UnauthorizedException} from "../utils/exceptions";
import jwt, {JwtPayload} from "jsonwebtoken";
import config from "../utils/config";
import db from "../db";

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
            return next();
        }
        throw exception; // Decoded token does not contain expected payload
    } catch (e) {
        next(e);
    }
}