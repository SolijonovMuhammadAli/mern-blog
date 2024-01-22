import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddContainer() {
  const [post, setPost] = useState({ title: "", text: "", file: "" });
  const [postFile, setPostFile] = useState("");
  const onChange = (e) => {
    const { value, name } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeFile = (e) => {
    const { files, name } = e.target;
    console.log(name, files);
    setPostFile("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(post);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Default</Form.Label>
        <Form.Control type="file" onChange={onChangeFile} value={postFile} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" onChange={onChange} value={post.name} name="name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={onChange} value={post.text} name="text" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Qo'shish
      </Button>
    </Form>
  );
}

export default AddContainer;
