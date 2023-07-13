import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TestPDR = () => {
  const navigate = useNavigate();
  const lastMC = localStorage.getItem("last_mc");
  const token = localStorage.getItem("token");
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [questionQuiz, setQuestionQuiz] = useState("");
  const { id } = useParams();

  const getQuestions = (item) => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/questions/2/1/${item}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data.data);
        setQuestionQuiz(res.data.data[0]);
        setTotalData(res.data.totaldata);
      });
  };

  useEffect(() => {
    if (lastMC >= 1) {
      setPage(parseInt(lastMC) + 1);
      getQuestions(parseInt(lastMC) + 1);
    } else {
      getQuestions(page);
    }
  }, [token]);
  console.log(selectedAnswer);

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/save_answer/${id}`,
        { data: [{ id_question: questionQuiz.id, answer: selectedAnswer }] },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        if (page !== totalData) {
          setPage((prev) => prev + 1);
          getQuestions(page + 1);
        } else {
          setPage(0);
          navigate(`/closing/${id}`);
        }
      });
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    setSelectedAnswer(answer);
  };

  return (
    <>
      <p className="fs-3 fw-bold text-center mt-4">People Digital Readiness</p>
      <div className="card shadow-lg border-0 mx-5 p-1">
        <div className="quiz-container">
          <div>
            <div>
              <span className="active-question-no">{addLeadingZero(page)}</span>
              <span className="total-question">
                /{addLeadingZero(totalData)}
              </span>
            </div>
            <h2>{questionQuiz?.question}</h2>
            <ul>
              {questionQuiz.option?.map((answer, index) => (
                <li
                  onClick={() => onAnswerSelected(answer.value, index)}
                  key={answer.option}
                  className={
                    selectedAnswerIndex === index ? "selected-answer" : null
                  }
                >
                  {answer.option}
                </li>
              ))}
            </ul>
            <div className="flex-right">
              <button
                onClick={() => {
                  setPage((prev) => prev - 1);
                  getQuestions(page - 1);
                }}
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
    </>
  );
};

export default TestPDR;
