import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Closing = () => {
  const navigate = useNavigate();
  const [dataClosing, setDataClosing] = useState("");
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
        setDataClosing(res.data.data.closing);
      });
  }, []);

  return (
    <div className="p-4 mt-5 d-flex justify-content-center">
      <div className="card p-5 shadow-lg border-0 text-center w-75">
        {id === "8" ? (
          <p className="fs-5 fw-bold">{dataClosing}</p>
        ) : (
          <p className="fs-1 fw-bold">{dataClosing}</p>
        )}
        <button
          className="btn bg-blue p-2 mt-3 w-50 mx-auto text-white"
          onClick={() => navigate("/home")}
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  );
};

export default Closing;
