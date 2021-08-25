import { Router } from "express";
import MeRouter from "./MeRoute";
import PostRouter from "./PostRoutes";

const router = Router();

router.use("/me", MeRouter);
router.use("/posts", PostRouter);

export default router;
