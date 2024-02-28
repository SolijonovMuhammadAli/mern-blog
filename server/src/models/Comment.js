import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    comment: { type: String, require: true },
    author: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Comment", schema);
