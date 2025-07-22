import { Router } from "express";
import {registerUser} from "./auth.controller";
import {body} from "express-validator";

const router = Router();

router.post("/register", body('username').isAlphanumeric().notEmpty(), body('password').notEmpty() , registerUser);
// router.post("/login")

export default router;