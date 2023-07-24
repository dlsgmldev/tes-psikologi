import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Closing = () => {
  const navigate = useNavigate();
  const [dataEnding, setDataEnding] = useState("");
  const token = localStorage.getItem("token");
  const idCompany = localStorage.getItem("id_company");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/company/get_closing_test/${idCompany}/${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setDataEnding(res.data.data.closing);
      });
  }, []);

  return (
    <div className="p-4 mt-5 d-flex justify-content-center">
      <div className="card p-5 shadow-lg border-0 text-center w-75">
        <p className="fs-1 fw-bold">{dataEnding}</p>
        <button
          className="btn bg-blue p-2 mt-3 w-50 mx-auto"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Closing;
