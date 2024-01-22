const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routerAuth = require("./routes/auth.route");
const routerTodo = require("./routes/todo.route");

require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.SERVER_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/auth", routerAuth);
app.use("/api/todo", routerTodo);

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
