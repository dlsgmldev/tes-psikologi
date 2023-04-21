import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([""]);
  const [id, setId] = useState("");
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");

  const newArray = [];

  const handleChange = (e) => {
    const index = newArray.findIndex((p) => p.id_question === e.target.id);
    if (index > -1) {
      newArray[index] = { id_question: e.target.id, answer: e.target.value };
    } else {
      newArray.push({ id_question: e.target.id, answer: e.target.value });
    }
  };

  const handleClick = (e) => {
    const tag = e.currentTarget.dataset.tag;
    document.querySelector(`input[id='${tag}'][value='1']`).checked = true;
    const index = newArray.findIndex((p) => p.id_question === tag);
    if (index > -1) {
      newArray[index] = { id_question: tag, answer: "1" };
    } else {
      newArray.push({ id_question: tag, answer: "1" });
    }
  };

  const handleClick2 = (e) => {
    const tag = e.currentTarget.dataset.tag;
    document.querySelector(`input[id='${tag}'][value='0']`).checked = true;
    const index = newArray.findIndex((p) => p.id_question === tag);
    if (index > -1) {
      newArray[index] = { id_question: tag, answer: "0" };
    } else {
      newArray.push({ id_question: tag, answer: "0" });
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}holland/questions`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setQuestions(res.data.data);
      });
  }, [token]);

  const numbers = newArray.map((item) => parseInt(item.id_question));
  const missingItems = (arr, n) => {
    let missingItems = [];
    for (let i = 1; i <= n; i++) if (!arr.includes(i)) missingItems.push(i);
    return missingItems;
  };
  const missingNumbers = missingItems(numbers, 108);

  const handleSubmit = () => {
    console.log(newArray);
    // if (newArray.length === 108) {
    //   axios
    //     .post(
    //       `${process.env.REACT_APP_URL}holland/save_answer`,
    //       { data: newArray },
    //       {
    //         headers: { Authorization: "Bearer " + token },
    //       }
    //     )
    //     .then((res) => {
    //       navigate("/thankyou");
    //     })
    //     .catch((err) => {
    //       alert("failed");
    //     });
    // } else {
    //   setShow(true);
    //   window.location.href = `/test#${Math.min(...missingNumbers)}`;
    // }
  };

  const handleClose = () => {
    missingNumbers.map((item) => {
      document.getElementById("box_" + item).style.backgroundColor =
        "rgb(246, 47, 47)";
      document.getElementById("box2_" + item).style.backgroundColor =
        "rgb(246, 47, 47)";
    });
    numbers.map((item) => {
      document.getElementById("box_" + item).style.backgroundColor = "white";
      document.getElementById("box2_" + item).style.backgroundColor = "white";
    });
    setShow(false);
  };

  return (
    <div className="container p-4 mt-3">
      <p className="fs-3 fw-bold text-center">Holland Test</p>
      <p className="">
        Bacalah setiap pertanyaan di bawah ini. Jika Anda setuju dengan
        pernyataan tersebut, silahkan beri tanda silang "x" di kolom yang
        tersedia. Tidak ada jawaban yang benar atau salah.
      </p>
      <table className="table table-striped table-bordered table-light">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              No.
            </th>
            <th scope="col">Pernyataan</th>
            <th className="text-center" scope="col">
              Ya
            </th>
            <th className="text-center" scope="col">
              Tidak
            </th>
          </tr>
        </thead>
        <tbody onChange={handleChange}>
          {questions.map((item) => (
            <tr>
              <th scope="row" className="fw-normal text-center">
                {item.id}
              </th>
              <th scope="row" className="fw-normal">
                {item.question}
              </th>
              <td
                data-tag={item.id}
                className="text-center"
                id={"box_" + item.id}
                onClick={handleClick}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  id={item.id}
                  name={"question_" + item.id}
                  value="1"
                  required
                />
              </td>
              <td
                data-tag={item.id}
                className="text-center"
                id={"box2_" + item.id}
                onClick={handleClick2}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  id={item.id}
                  name={"question_" + item.id}
                  value="0"
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-success w-25 float-end mb-3"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {/* modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Close"
            onClick={handleClose}
          ></button>
          <p className="h4 fw-bold text-center text-danger mt-2">Failed!</p>
          <p className="text-center">Please fill in the required fields.</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Test;
