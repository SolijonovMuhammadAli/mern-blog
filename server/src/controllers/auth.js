import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.status(402).json({ message: "Bunday foydalanuvchi oldin mavjud" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, password: hash });

    await newUser.save();

    res.status(201).json({ newUser, message: "Resgister Success" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Registertion error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Bunday foydalanuvchi mavjud emas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Parol xato" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "30d" });

    return res.status(200).json({ token, userId: user.id });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Login error" });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findOne(req.userId);
    if (!user) {
      res.json({ message: "Bunday yuser mavjud emas" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(404).json({ message: "Login error" });
  }
};
