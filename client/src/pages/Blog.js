import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Badge } from "react-bootstrap";
import axios from "../utils/axiosConfig";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

function Blog() {
  const [post, setPost] = useState(null);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { id } = useParams();

  const getComments = (id) => {
    axios.get(`/post/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  };

  useEffect(() => {
    axios
      .get("/post/" + id)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
    getComments(id);
  }, [id]);

  const onSubmitComment = (e) => {
    e.preventDefault();
    axios.post(`/comment/${id}`, { postId: id, comment }).then((res) => {
      setComment("");
      getComments(res.data.id);
    });
  };

  if (!post) return "Loading...";
  return (
    <div className="d-flex gap-4">
      <Link to="/home">
        <Button>Back</Button>
      </Link>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={`http://localhost:8888/files/${post.imgUrl}`} />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.text}</Card.Text>
          <div>
            See:
            <Badge bg="primary">{post.views}</Badge>
          </div>
          <div>
            Commit:
            <Badge bg="primary">{post.comments.length || 0}</Badge>
          </div>
        </Card.Body>
      </Card>
      <div>
        <Form onSubmit={onSubmitComment}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment</Form.Label>
            <Form.Control value={comment} onChange={(e) => setComment(e.target.value)} />
          </Form.Group>
        </Form>
        <ListGroup>
          {comments.map((item) => (
            <ListGroup.Item key={item._id}>
              <span>user: {item.user}</span>
              <br />
              <span>comment: {item.comment}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Blog;
