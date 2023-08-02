import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img from "../../assets/WhatsApp Image 2023-07-25 at 16.05.43.jpg";
import img2 from "../../assets/WhatsApp Image 2023-07-25 at 16.05.45.jpg";
import img3 from "../../assets/WhatsApp Image 2023-07-25 at 16.23.44.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [dataTest, setDataTest] = useState([]);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

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
    data.status === 0
      ? navigate(`/opening/${id}`)
      : data.status === 1
      ? navigate(`/${data.slug}/${id}`)
      : data.status === 2
      ? navigate(`/closing/${id}`)
      : navigate(`/home`);
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <p className="fs-4 mb-1">
          Selamat datang, <span className="text-blue fw-bold">{name}</span>
        </p>
        <span>
          di laman tes psikologi GML Anda diharuskan melakukan tes di bawah ini:
        </span>
      </div>
      <Row className="mt-4 gap-3 row-cols-6 d-flex justify-content-center">
        {dataTest?.map((item) => (
          <Col className="card border-0 shadow-lg p-3 text-center">
            {item.name === "People Digital Readiness" ? (
              <img src={img} width="auto" />
            ) : item.name === "Verbal Test" ? (
              <img src={img2} width="auto" />
            ) : item.name === "Holland Test" ? (
              <img src={img3} width="auto" />
            ) : (
              ""
            )}
            <p className="mt-auto mb-2 fw-bold">{item.name}</p>
            <button
              className="btn bg-blue text-white fw-bold w-100"
              disabled={item.status === 2}
              onClick={() => handleTest(item.id)}
            >
              Ikuti Tes
            </button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
