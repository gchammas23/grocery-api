import { Request, Response, NextFunction } from "express";
import { validationResult, matchedData } from "express-validator";
import {registrationService} from "./auth.service";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate input before proceeding
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: 'Invalid data' });
        }
        await registrationService(matchedData(req));
        return res.send({ message: 'User registered successfully' });
    } catch (e) {
        next(e);
    }
}