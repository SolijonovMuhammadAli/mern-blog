import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import axios from "../utils/axiosConfig";
import Button from "react-bootstrap/Button";

function Blogs() {
  const [allData, setAllData] = useState([]);

  const getAll = () => {
    axios.get("/post/user/me").then((res) => {
      setAllData(res.data);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/post/${id}`)
      .then(() => {
        getAll();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" mt-2">
      <Link to="/home">
        <Button>Back</Button>
      </Link>
      <div>
        {allData &&
          allData.map((i) => (
            <Card key={i._id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={`http://localhost:8888/files/${i.imgUrl}`} />
              <Card.Body>
                <Card.Title>{i.title}</Card.Title>
                <Card.Text>{i.text}</Card.Text>{" "}
                <div>
                  See:
                  <Badge bg="primary">{i.views}</Badge>
                </div>
                <div>
                  Commit:
                  <Badge bg="primary">{i.comments.length || 0}</Badge>
                </div>
                <Link to={`/edit/${i._id}`}>
                  <Button variant="info">Update</Button>
                </Link>
                <Button onClick={() => handleDelete(i._id)} variant="danger">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default Blogs;
