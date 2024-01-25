import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Badge } from "react-bootstrap";
import axios from "../utils/axiosConfig";

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
    <div>
      <Button>Back</Button>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={`http://localhost:8888/${post.imgUrl}`} />
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
    </div>
  );
}

export default Blog;
