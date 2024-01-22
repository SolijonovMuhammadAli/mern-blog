import React from "react";
import { InputGroup, Form } from "react-bootstrap";

function TodoItem({ task, deleteTask, toggleCompleted, editTodo }) {
  function handleChange() {
    toggleCompleted(task._id);
  }

  return (
    <div className="todo-item">
      <InputGroup className="mb-2">
        <InputGroup.Checkbox type="checkbox" checked={task.completed} onChange={handleChange} />
        <Form.Control placeholder="Text" value={task.text} disabled={true} aria-describedby="basic-addon2" />{" "}
        <InputGroup.Text id="basic-addon2" className="btn btn-success" onClick={() => editTodo(task)}>
          Edit
        </InputGroup.Text>
        <InputGroup.Text id="basic-addon2" className="btn btn-danger" onClick={() => deleteTask(task._id)}>
          Delete
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
}
export default TodoItem;
