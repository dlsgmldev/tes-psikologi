import React, { useEffect, useState } from "react";
import sound from "../../assets/Free_Test_Data_100KB_MP3.mp3";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";

const TestPauli = () => {
  const [number, setNumber] = useState([]);
  const [time, setTime] = useState(6000);

  useEffect(() => {
    // setInterval(() => {
    //   new Audio(sound).play();
    // }, 15000);

    axios
      .get(`${process.env.REACT_APP_URL}kraeplin/get_number`, {
        headers: {
          Authorization:
            "Basic " +
            btoa(
              `${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`
            ),
        },
      })
      .then((res) => {
        setNumber(res.data);
      });

    // const timer = setInterval(() => {
    //   setTime((time) => {
    //     if (time === 0) {
    //       clearInterval(timer);
    //       return 0;
    //     } else return time - 1;
    //   });
    // }, 1000);
  }, []);

  const tooltip = (
    <Tooltip id="tooltip">
      <span>Click the number to make a line.</span>
    </Tooltip>
  );

  const setLine = (id) => {
    document.getElementById("no-" + id).style.borderBottom = "5px solid red";
  };

  const totalData = number.length;
  const column = totalData / 51;
  console.log(column);
  const array = [];
  for (let index = 0; index < column; index++) {
    array.push(index);
  }
  console.log(array);

  return (
    <div className="p-5">
      <p className="fs-2 fw-bold text-center mt-4">Tes Pauli</p>
      <Card className="border w-20 p-1 text-center mx-auto mb-3 bg-warning">
        <span className="fw-bold text-white fs-5">
          {`${Math.floor(time / 3600)}`.padStart(2, 0)}:
          {`${Math.floor((time % 3600) / 60)}`.padStart(2, 0)}:
          {`${time % 60}`.padStart(2, 0)}
        </span>
      </Card>
      <Card className="bg-light rounded px-4 pt-4">
        <Row className="d-flex flex-row flex-nowrap overflow-auto">
          {array.map(
            (col) => (
              <Col sm={1} className="d-flex">
                <div>
                  {number.map((item) => {
                    if (item.col === col.toString()) {
                      return (
                        <OverlayTrigger placement="top" overlay={tooltip}>
                          <p
                            id={"no-" + item.id}
                            className="mb-number pointer"
                            onClick={() => setLine(item.id)}
                          >
                            {item.number}
                          </p>
                        </OverlayTrigger>
                      );
                    }
                  })}
                </div>
                <div className="ms-3 mt-3">
                  {number.map((item) => {
                    if (item.col === col.toString()) {
                      return (
                        <input
                          type="number"
                          name="number"
                          className="form-control input-number mt-input"
                        />
                      );
                    }
                  })}
                </div>
              </Col>
            )
          )}
        </Row>
      </Card>
    </div>
  );
};

export default TestPauli;
