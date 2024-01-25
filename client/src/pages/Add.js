import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import axios from "../utils/axiosConfig";

function AddContainer() {
  const [post, setPost] = useState({ title: "", text: "" });
  const [postFile, setPostFile] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    const { value, name } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeFile = (e) => {
    const { files } = e.target;
    setPostFile(files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", post.text);
    formData.append("title", post.title);
    formData.append("image", postFile);

    axios
      .post("/post", formData)
      .then((res) => {
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Default</Form.Label>
          <Form.Control type="file" onChange={onChangeFile} />
          {postFile && <Image src={URL.createObjectURL(postFile)} alt="image" width={100} />}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title" onChange={onChange} value={post.name} name="title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={onChange} value={post.text} name="text" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Qo'shish
        </Button>
      </Form>
    </Container>
  );
}

export default AddContainer;
