import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

import routerAuth from "./routes/route.auth.js";
import routerPosts from "./routes/route.posts.js";

dotenv.config();
const app = express();

// Database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.SERVER_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

//Routes
app.use("/api/auth", routerAuth);
app.use("/api/post", routerPosts);

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});