import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll, getId, getMyPosts, deletePost, updatePost } from "../controllers/posts.js";

const router = new Router();

router.post("/", checkAuth, createPost);
router.get("/", getAll);
router.get("/:id", checkAuth, getId);
router.get("/user/me", checkAuth, getMyPosts);
router.delete("/:id", checkAuth, deletePost);
router.put("/:id", checkAuth, updatePost);

export default router;
