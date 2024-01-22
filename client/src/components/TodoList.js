import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { Card, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [todoId, setTodoId] = useState(null);
  const { user } = useAuth();

  const addTask = async (e) => {
    e.preventDefault();

    if (todoId) {
      await axios
        .put("/api/todo/edit/" + todoId, { text })
        .then(() => {
          setText("");
          setTodoId(null);
          getAll(user);
        })
        .catch((err) => console.log(err));
    } else {
      await axios
        .post("/api/todo/add", { text, userId: user.userId })
        .then(() => {
          setText("");
          getAll(user);
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteTask = async (id) => {
    await axios
      .delete("/api/todo/delete/" + id)
      .then(() => getAll(user))
      .catch((err) => console.log(err));
  };

  const toggleCompleted = async (id) => {
    await axios
      .put("/api/todo/completed/" + id)
      .then(() => getAll(user))
      .catch((err) => console.log(err));
  };

  const editTodo = (data) => {
    setTodoId(data._id);
    setText(data.text);
  };

  const getAll = async ({ userId }) => {
    await axios
      .get("/api/todo/getAll", {
        params: { userId },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAll(user);
  }, [user]);

  return (
    <Card className="m-4 p-2">
      <Form onSubmit={addTask}>
        <InputGroup className="mb-2">
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Text id="basic-addon2" className="btn btn-primary" onClick={addTask}>
            {todoId ? "Edit" : "Add"}
          </InputGroup.Text>
        </InputGroup>
      </Form>
      <Card>
        {tasks.map((task) => (
          <TodoItem
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            editTodo={editTodo}
          />
        ))}
      </Card>
    </Card>
  );
}
export default TodoList;
