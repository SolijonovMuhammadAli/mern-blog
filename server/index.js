const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const routerAuth = require("./routes/auth.route");

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/auth", routerAuth);

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
