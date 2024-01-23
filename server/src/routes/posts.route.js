const { Router } = require("express");
const { checkAuth } = require("../utils/checkAuth");
const { createPost } = require("../controllers/posts");

const router = new Router();

router.post("/", checkAuth, createPost);

module.exports = router;
