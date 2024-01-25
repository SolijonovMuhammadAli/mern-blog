import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ type: Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

export default model("User", schema);
