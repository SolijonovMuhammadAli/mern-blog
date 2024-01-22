const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = Router();

router.post(
  "/registration",
  [check("username", "Userda muammo").isLength({ min: 1 }), check("password", "Paraolda muamo").isLength({ min: 3 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "Registarionda muammo" });
      }

      const { username, password } = req.body;
      const isUsed = await User.findOne({ username });

      if (isUsed) {
        return res.status(300).json({ message: "Bunday foydalanuvchi oldin mavjud" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ username, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "Foydalanuvchi saqlandi" });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/login",
  [check("username", "Userda muammo").exists(), check("password", "Paraolda muamo").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "Registarionda muammo" });
      }

      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Bunday foydalanuvchi mavjud emas" });
      }

      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Parol xato" });
      }

      const jwtSecret = "adfsfasfmasdlmfasdfmadsfkamfaldkfmdsafmkds";
      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });

      res.status(200).json({ token, userId: user.id });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
