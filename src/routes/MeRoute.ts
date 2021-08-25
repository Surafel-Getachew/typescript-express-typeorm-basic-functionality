import {Router} from "express";
import * as MeController from "../controller/me.controller"

const router = Router();

router.post("/signup",MeController.signUp)
router.post("/login",MeController.login)
export default router;