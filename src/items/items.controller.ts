import { Request, Response, NextFunction } from "express";
import {matchedData, validationResult} from "express-validator";
import {addItemService} from "./items.service";

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: 'Invalid data' });
        }
        await addItemService({ ...matchedData(req), user_id: req.userId });
        return res.send({ message: 'Item successfully added' });
    } catch (e) {
        next(e);
    }
}