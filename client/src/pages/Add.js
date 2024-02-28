import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import axios from "../utils/axiosConfig";
import Axios from "axios";

function AddContainer() {
  const [post, setPost] = useState({ title: "", text: "" });
  const [postFile, setPostFile] = useState("");
  const navigate = useNavigate();
  const params = useParams();

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

    const url = params && params.id ? `/post/${params.id}` : "/post";
    const method = params && params.id ? "put" : "post";

    axios[method](url, formData)
      .then((res) => {
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (params && params.id) {
      axios.get(`/post/${params.id}`).then((res) => {
        console.log(res.data);
        const { title, text, imgUrl } = res.data;
        setPost({ title, text });
        if (imgUrl) {
          Axios.get(`/files/${imgUrl}`, { responseType: "blob" }).then((res) => {
            setPostFile(new File([res.data], imgUrl));
          });
        }
      });
    }
  }, []);

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
          <Form.Control type="text" placeholder="Title" onChange={onChange} value={post.title} name="title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={onChange} value={post.text} name="text" />
        </Form.Group>
        <Button variant="primary" type="submit">
          {params && params.id ? "O'zgartirish" : " Qo'shish"}
        </Button>
      </Form>
    </Container>
  );
}

export default AddContainer;
