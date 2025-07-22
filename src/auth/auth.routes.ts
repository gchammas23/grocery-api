import { Router } from "express";
import {loginUser, registerUser} from "./auth.controller";
import {body} from "express-validator";

const router = Router();

router.post("/register", body('username').isAlphanumeric().notEmpty(), body('password').notEmpty() , registerUser);
router.post("/login", body('username').isAlphanumeric().notEmpty(), body('password').notEmpty(), loginUser);

export default router;