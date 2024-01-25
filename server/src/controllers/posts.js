import { fileURLToPath } from "url";
import path, { dirname } from "path";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { text, title } = req.body;

    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });
      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });
      res.status(200).json(newPostWithImage);
    } else {
      const newPostWithoutImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: "",
        author: req.userId,
      });

      await newPostWithoutImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithoutImage },
      });
      res.status(200).json(newPostWithoutImage);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("-views");

    if (!posts) {
      return res.json({ message: "Post not" });
    }
    res.json({ posts, popularPosts });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};

export const getId = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: "Error get Id" });
  }
};
