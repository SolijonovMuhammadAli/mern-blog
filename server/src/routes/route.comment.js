import { Router } from "express";
import { createComment } from "../controllers/comment.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

router.post("/:id", checkAuth, createComment);

export default router;
