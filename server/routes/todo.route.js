const { Router } = require("express");
const router = Router();
const Todo = require("../models/Todo");

router.post("/add", async (req, res) => {
  try {
    const { text, userId } = req.body;
    const todo = await Todo({
      text,
      owner: userId,
      completed: false,
      important: false,
    });

    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const { userId } = req.query;

    const todo = await Todo.find({ owner: userId });
    res.status(200).json(todo);
    // const todo = await
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id });
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
});

router.put("/completed/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    todo.completed = !todo.completed;

    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    todo.text = req.body.text;

    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
