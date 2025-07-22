import { Request, Response, NextFunction } from "express";
import {matchedData, validationResult} from "express-validator";
import {addItemService, deleteItemService, editItemService, getAllUserItems} from "./items.service";

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

export const getUserItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllUserItems(req.userId);
        return res.status(200).send(result);
    } catch (e) {
        next(e);
    }
}

export const editItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: 'Invalid data' });
        }
        const itemId: string = req.params.id;
        await editItemService({...matchedData(req), user_id: req.userId, itemId });
        return res.send({ message: `Item with id ${itemId} successfully edited` });
    } catch (e) {
        next(e);
    }
}

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: 'Invalid data' });
        }
        const itemId: number = matchedData(req).id;
        await deleteItemService(itemId, req.userId);
        return res.send({ message: 'Item successfully deleted' });
    } catch (e) {
        next(e);
    }
}