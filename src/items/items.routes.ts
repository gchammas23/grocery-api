import { Router } from "express";
import {body} from "express-validator";
import {addItem, getUserItems} from "./items.controller";

const router = Router();

router.post('/', body('name').isString().notEmpty(), body('quantity').isInt({ min: 1 }), body('store').isString().notEmpty(), addItem);
router.get('/', getUserItems);

export default router;