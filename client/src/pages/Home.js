import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import axios from "../utils/axiosConfig";
import Moment from "react-moment";

function Home() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios.get("/post").then((res) => {
      setAllData(res.data);
    });
  }, []);

  return (
    <div className="home mt-2">
      <div>
        {allData?.posts &&
          allData.posts.map((i) => (
            <Card key={i._id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={`http://localhost:8888/files/${i.imgUrl}`} />
              <Card.Body>
                <Card.Title>{i.title}</Card.Title>
                <Card.Text>{i.text}</Card.Text>{" "}
                <Link to={`/blog/${i._id}`}>
                  See:
                  <Badge bg="primary">{i.views}</Badge>
                </Link>
                <div>
                  Commit:
                  <Badge bg="primary">{i.comments.length || 0}</Badge>
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>
      <div>
        <ListGroup>
          {allData?.popularPosts &&
            allData.popularPosts.map((i) => (
              <ListGroup.Item key={i._id}>
                <Badge>
                  <Moment date={i.createAt} format="D MMM YYYY" />
                </Badge>

                <div>{i.title}</div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Home;
