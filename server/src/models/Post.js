const { Schema, model, Types } = require("mongoose");

const schema = new Schema(
  {
    username: { type: String },
    title: { type: String, require: true },
    text: { type: String, require: true },
    imgUrl: { type: String, default: "" },
    views: { type: Number, default: 0 },
    author: { type: Types.ObjectId, ref: "User" },
    comments: [{ type: Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = model("Post", schema);
