import { Router } from "express";
import { body, param } from "express-validator";
import {addItem, deleteItem, editItem, getUserItems} from "./items.controller";

const router = Router();

router.post('/', body('name').isString().notEmpty(), body('quantity').isInt({ min: 1 }), body('store').isString().notEmpty(), addItem);
router.get('/', getUserItems);
router.delete('/:id', param('id').isInt().notEmpty(), deleteItem);
router.put('/:id', param('id').isInt().notEmpty(), body('name').isString().notEmpty(), body('quantity').isInt({ min: 1 }), body('store').isString().notEmpty(), editItem)

export default router;