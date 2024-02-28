import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Badge } from "react-bootstrap";
import axios from "../utils/axiosConfig";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

function Blog() {
  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    axios
      .get("/post/" + id)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

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
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={1} />
          </Form.Group>
        </Form>
        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default Blog;
