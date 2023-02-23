import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Opening = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}holland/start`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        navigate("/test");
      })
      .catch((err) => {
        alert("failed");
      });
  };

  return (
    <div className="container p-4 text-center mt-5">
      <p className="fs-1">Holland Test Online</p>
      <p className="">
        Selamat datang di Holland Test Online. Anda akan mengerjakan beberapa
        soal dengan estimasi 20 menit
      </p>
      <button className="btn btn-success p-2 w-25 mt-3" onClick={handleSubmit}>
        Start
      </button>
    </div>
  );
};

export default Opening;
