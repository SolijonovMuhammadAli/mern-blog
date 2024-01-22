import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth } from "../context/AuthProvider";

function SignIn() {
  const [data, setInput] = useState({
    username: "",
    password: "",
  });
  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (data.username !== "" && data.password !== "") {
      auth.signIn(data);
      return;
    }
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Form onSubmit={handleSubmitEvent}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter text"
          name="username"
          onChange={handleInput}
          value={data.username}
        />
        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleInput}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>

      <Link to="/signup">Registration</Link>
    </Form>
  );
}

export default SignIn;
