const { fileURLToPath } = require("url");
const path = require("path");
const Post = require("../models/Post");
const User = require("../models/User");

const { dirname } = path;

const createPost = async (req, res) => {
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
    }
  } catch (error) {
    res.json({ message: "Error" });
  }
};

module.exports = { createPost };
