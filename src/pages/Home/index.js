import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [dataTest, setDataTest] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/get_test`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataTest(res.data.data);
      });
  }, []);

  const handleTest = (id) => {
    const data = dataTest.find((item) => item.id === id);
    navigate(`/${data.slug}/${id}`)
    // data.status === "0"
    //   ? navigate(`/opening/${id}`)
    //   : data.status === "1"
    //   ? navigate(`/${data.slug}`)
    //   : data.status === "2"
    //   ? navigate(`/closing/${id}`)
    //   : navigate(`/home`);
  };

  return (
    <Row className="container p-5 gap-3 ">
      {dataTest?.map((item) => (
        <Col className="card border-0 shadow-lg p-3 text-center">
          <p>{item.name}</p>
          <button
            className="btn btn-warning text-white fw-bold mt-auto"
            onClick={() => handleTest(item.id)}
          >
            Ikuti Tes
          </button>
        </Col>
      ))}
    </Row>
  );
};

export default Home;
