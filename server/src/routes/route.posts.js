import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll, getId } from "../controllers/posts.js";

const router = new Router();

router.post("/", checkAuth, createPost);
router.get("/", getAll);
router.get("/:id", checkAuth, getId);

export default router;
