import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;

    if (!comment) return res.status(404).json({ message: "Not found" });

    const newComment = new Comment({ comment, author: req.userId });
    await newComment.save();
    try {
      const post = await Post.findByIdAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        }
      );
      res.status(200).json({ id: post._id, message: "Add Comment" });
    } catch (error) {
      res.status(400).json({ message: "Don't save comment" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};
