import { Router } from "express";
import * as PostController from "../controller/post.Controller";
import { setUser } from "../util/jwt";

const router = Router();

router.use(setUser);

router.post("/", PostController.addPost);
router.get("/", PostController.getAll);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

router.get("/try",PostController.tryRoute)

export default router;
