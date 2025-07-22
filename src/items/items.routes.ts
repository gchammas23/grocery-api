import { Router } from "express";
import { body, param } from "express-validator";
import { addItem, deleteItem, getUserItems } from "./items.controller";

const router = Router();

router.post('/', body('name').isString().notEmpty(), body('quantity').isInt({ min: 1 }), body('store').isString().notEmpty(), addItem);
router.get('/', getUserItems);
router.delete('/:id', param('id').isInt().notEmpty(), deleteItem);

export default router;