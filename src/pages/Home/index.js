import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

  const critical = dataTest.find((item) => item.id === 8);

  return (
    <div className="p-4">
      <div className="text-center">
        <p className="fs-4 mb-1">
          Selamat datang, <span className="text-blue fw-bold">{name}</span>
        </p>
        <span>
          di laman tes psikologi ini Anda diharuskan melakukan tes di bawah ini:
        </span>
      </div>
      <Row className="mt-4 gap-3 row-cols-6 d-flex justify-content-center">
        {dataTest?.map((item) => (
          <Col className="card border-0 shadow-lg p-3 text-center">
            <img src={item.image} width="auto" />
            <p className="mt-auto mb-2 fw-bold">{item.name}</p>
            {item.id === 8 ? (
              <button
                className="btn bg-blue text-white fw-bold w-100"
                disabled={critical.status === 2}
                onClick={() => handleTest(item.id)}
              >
                Ikuti Tes
              </button>
            ) : (
              <button
                className="btn bg-blue text-white fw-bold w-100"
                disabled={critical.status !== 2 || item.status === 2}
                onClick={() => handleTest(item.id)}
              >
                Ikuti Tes
              </button>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
