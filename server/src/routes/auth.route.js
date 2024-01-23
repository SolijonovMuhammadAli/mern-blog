const { Router } = require("express");
const { register, login, getMe } = require("../controllers/auth");
const { checkAuth } = require("../utils/checkAuth");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", checkAuth, getMe);

module.exports = router;
