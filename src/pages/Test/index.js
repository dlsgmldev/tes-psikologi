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

  const handleChange = (e) => {
    setId({ ...id, [e.target.id]: e.target.id });
    setAnswer({ ...answer, [e.target.name]: e.target.value });
  };

  const idQuestion = Object.values(id);
  const answerQuestion = Object.values(answer);

  const arrayId = idQuestion.map((item) => {
    return { id_question: item };
  });
  const arrayQuestion = answerQuestion.map((item) => {
    return { answer: item };
  });

  var newArray = arrayId.map((obj, index) => ({
    ...obj,
    ...arrayQuestion[index],
  }));

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
    if (newArray.length === 108) {
      axios
        .post(
          `${process.env.REACT_APP_URL}holland/save_answer`,
          { data: newArray },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          navigate("/thankyou");
        })
        .catch((err) => {
          alert("failed");
        });
    } else {
      setShow(true);
      window.location.href = `/test#${Math.min(...missingNumbers)}`;
    }
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
      <p className="fs-1 text-center">Holland Test</p>
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
              <td className="text-center" id={"box_" + item.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  id={item.id}
                  name={"question_" + item.id}
                  value="1"
                  required
                />
              </td>
              <td className="text-center" id={"box2_" + item.id}>
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
