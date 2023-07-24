import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { Modal } from "react-bootstrap";

const TestKecerdasan = () => {
  const navigate = useNavigate();
  const lastPage = JSON.parse(localStorage.getItem("last_page"));
  const token = localStorage.getItem("token");
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [questionQuiz, setQuestionQuiz] = useState("");
  const [show, setShow] = useState(false);
  const answerArray = JSON.parse(localStorage.getItem("new_array"));
  const { id } = useParams();

  const getQuestions = (item) => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/questions/${id}/1/${item}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setQuestionQuiz(res.data.data[0]);
        setTotalData(res.data.totaldata);
        const answerArray = JSON.parse(localStorage.getItem("new_array"));
        const index = answerArray.find(
          (p) => p.id_question === res.data.data[0].id
        );
        if (index?.answer === "a") {
          setSelectedAnswerIndex(0);
        } else if (index?.answer === "b") {
          setSelectedAnswerIndex(1);
        } else if (index?.answer === "c") {
          setSelectedAnswerIndex(2);
        } else if (index?.answer === "d") {
          setSelectedAnswerIndex(3);
        } else if (index?.answer === "e") {
          setSelectedAnswerIndex(4);
        } else {
          setSelectedAnswerIndex(null);
        }
      });
  };

  useEffect(() => {
    getQuestions(lastPage ? lastPage : page);
    setPage(lastPage ? lastPage : 1);
  }, [token]);

  const onClickNext = () => {
    if (page !== totalData) {
      setPage((prev) => prev + 1);
      getQuestions(page + 1);
      localStorage.setItem("last_page", JSON.stringify(page + 1));
    } else {
      setShow(true);
    }
  };

  const handleSubmit = () => {
    const answerArray = JSON.parse(localStorage.getItem("new_array"));
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/save_answer/${id}`,
        { data: answerArray },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setPage(0);
        localStorage.removeItem("new_array");
        localStorage.removeItem("last_page");
        navigate(`/closing/${id}`);
      });
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const onAnswerSelected = (answer, indexAnswer) => {
    setSelectedAnswerIndex(indexAnswer);
    const index = answerArray.findIndex(
      (p) => p.id_question === questionQuiz.id
    );
    if (index > -1) {
      answerArray[index] = { id_question: questionQuiz.id, answer: answer };
    } else {
      answerArray.push({ id_question: questionQuiz.id, answer: answer });
    }
    localStorage.setItem("new_array", JSON.stringify(answerArray));
  };

  return (
    <>
      <p className="fs-2 fw-bold text-center mt-4">Tes Kecerdasan</p>
      <div className="card shadow-lg border-0 mx-5 p-1">
        <div className="quiz-container">
          <div>
            <div>
              <span className="active-question-no">
                {addLeadingZero(lastPage ? lastPage : page)}
              </span>
              <span className="total-question">
                /{addLeadingZero(totalData)}
              </span>
            </div>
            <div className="mb-2">
              {ReactHtmlParser(questionQuiz?.instruction)}
            </div>
            <p className="fw-bold">{questionQuiz?.question}</p>
            <ul>
              {questionQuiz.option?.map((answer, index) => (
                <li
                  onClick={() => onAnswerSelected(answer.value, index)}
                  key={answer.option}
                  className={
                    selectedAnswerIndex === index ? "selected-answer" : null
                  }
                >
                  {answer.value}. {answer.option}
                </li>
              ))}
            </ul>
            <div className="flex-right">
              <button
                onClick={() => {
                  setPage((prev) => prev - 1);
                  getQuestions(page - 1);
                  localStorage.setItem("last_page", JSON.stringify(page - 1));
                }}
                disabled={page === 1}
                className="me-3"
              >
                Prev
              </button>
              <button
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}
              >
                {page === totalData ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <p className="fs-4 fw-bold">Confirmation</p>
          <p>Are you sure you want submit?</p>
          <div className="d-flex justify-content-center">
            <div
              className="btn bg-blue mx-2 text-white px-4"
              onClick={handleSubmit}
            >
              OK
            </div>
            <div
              className="btn bg-blue mx-2 text-white px-4"
              onClick={() => setShow(false)}
            >
              Cancel
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TestKecerdasan;
