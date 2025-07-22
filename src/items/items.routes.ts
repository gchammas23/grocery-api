import { Router } from "express";
import {body} from "express-validator";
import {addItem} from "./items.controller";

const router = Router();

router.post('/', body('name').isString().notEmpty(), body('quantity').isInt({ min: 1 }), body('store').isString().notEmpty(), addItem);

export default router;