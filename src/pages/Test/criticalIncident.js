import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Modal, Spinner } from "react-bootstrap";

const CriticalIncident = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [questionQuiz, setQuestionQuiz] = useState([""]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getQuestions = () => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/questions/8/18/1`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setQuestionQuiz(res.data.data);
      });
  };

  useEffect(() => {
    getQuestions();
  }, [token]);

  const answerArray = [];

  const handleChange = (e) => {
    let getSt = localStorage.getItem("new_array");
    let answerArray = getSt == null ? [] : JSON.parse(getSt);
    const index = answerArray.findIndex((p) => p.id_question === e.target.id);
    if (index > -1) {
      if (e.target.value == "") {
        alert("Form tidak boleh kosong.");
      } else {
        answerArray[index] = {
          id_question: e.target.id,
          answer: e.target.value,
        };
      }
    } else {
      answerArray.push({ id_question: e.target.id, answer: e.target.value });
    }
    localStorage.setItem("new_array", JSON.stringify(answerArray));
  };

  const handleSubmit = () => {
    setLoading(true);
    let getSt = localStorage.getItem("new_array");
    let answer = getSt == null ? [] : JSON.parse(getSt);
    if (answer.length != 18) {
      setShow(false);
      alert(
        "Terdapat soal yang belum terisi, silakan cek kembali agar semua form terisi."
      );
    } else {
      axios
        .post(
          `${process.env.REACT_APP_URL}ac/save_answer/8`,
          { data: answer },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          navigate(`/closing/${id}`);
        });
    }
  };

  return (
    <>
      <p className="fs-2 fw-bold text-center mt-4">Critical Incident</p>
      <div className="card shadow-lg border-0 mx-5 p-1">
        <div className="quiz-container">
          <div className="card bg-blue p-3 border-0 shadow text-white rounded mx-auto text-center fw-bold">
            <p className="">BERIKAN GAMBARAN MENGENAI DIRI PRIBADI ANDA</p>
            <p className="mb-0">
              Isilah bagian ini dengan jujur, terbuka dan apa adanya.
            </p>
          </div>
          {questionQuiz?.map(
            (item) =>
              questionQuiz.indexOf(item) < 4 && (
                <div className="mt-4">
                  <p className="fw-bold">{item.question}</p>
                  <textarea
                    id={item.id}
                    name="answer"
                    className="form-control text-area"
                    onChange={handleChange}
                    maxLength="100"
                  />
                </div>
              )
          )}
        </div>
      </div>

      <div className="card shadow-lg border-0 mx-5 p-1 mt-5">
        <div className="quiz-container">
          <div className="card bg-blue p-3 border-0 shadow text-white rounded mx-auto text-center fw-bold">
            <p className="">
              Jawablah pertanyaan-pertanyaan yang ada sesuai dengan kejadian
              atau peristiwa yang pernah Anda lakukan atau alami dalam pekerjaan
              atau tugas dalam rentang 3 (tiga) tahun terakhir.
            </p>
            <p className="mb-0">
              Hindari menjawab pertanyaan yang tidak sesuai dengan apa yang
              pernah Anda lakukan atau alami!
            </p>
          </div>
          {questionQuiz?.map(
            (item) =>
              questionQuiz.indexOf(item) > 3 && (
                <div className="mt-4">
                  <p className="fw-bold">{item.question}</p>
                  <textarea
                    id={item.id}
                    name="answer"
                    className="form-control text-area"
                    onChange={handleChange}
                    maxLength="100"
                  />
                </div>
              )
          )}
          <div className="flex-right">
            <button onClick={() => setShow(true)}>Selesai</button>
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <p className="fs-4 fw-bold">Konfirmasi</p>
          <p>Apakah Anda yakin ingin menyelesaikan ini?</p>
          <div className="d-flex justify-content-center">
            <div
              className="btn bg-blue mx-2 text-white px-4"
              onClick={handleSubmit}
            >
              {loading === true ? <Spinner animation="border" size="sm" /> : "Ya"}
            </div>
            <div
              className="btn bg-blue mx-2 text-white px-4"
              onClick={() => setShow(false)}
            >
              Tidak
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CriticalIncident;
