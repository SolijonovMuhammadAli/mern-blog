import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createPost = async (req, res) => {
  try {
    const { text, title } = req.body;

    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
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
      return res.status(200).json(newPostWithImage);
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
      return res.status(200).json(newPostWithoutImage);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Error" });
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
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } });
    return res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: "Error get Id" });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(user.posts.map((post) => Post.findById(post._id)));
    return res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) return res.json({ message: "Bunday post mavjud emas" });
    if (post.imgUrl) fs.unlinkSync(path.join(__dirname, "..", "uploads", post.imgUrl));

    const user = await User.findByIdAndUpdate(
      { _id: req.userId },
      {
        $pull: { posts: req.params.id },
      }
    );

    res.status(200).json({ messge: "Delete" });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const post = await Post.findById(req.params.id);

    if (req.files) {
      fs.unlinkSync(path.join(__dirname, "..", "uploads", post.imgUrl));
      let fileName = Date.now().toString() + req.files.image.name;
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));
      post.imgUrl = fileName || "";
    }

    post.title = title;
    post.text = text;
    await post.save();
    res.status(200).json({ messge: "Update" });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const list = await Promise.all(
      post.comments.map(async (comment) => {
        const findComment = await Comment.findById(comment);
        const user = await User.findById(findComment.author);
        return { _id: findComment._id, comment: findComment.comment, user: user.username };
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};
