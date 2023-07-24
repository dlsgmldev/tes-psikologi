import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Opening = () => {
  const navigate = useNavigate();
  const [dataOpening, setDataOpening] = useState("");
  const token = localStorage.getItem("token");
  const idCompany = localStorage.getItem("id_company");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/company/get_opening_test/${idCompany}/${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setDataOpening(res.data.data);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/start/${id}`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        navigate(`/${dataOpening.slug}/${id}`);
      })
      .catch((err) => {
        alert("failed");
      });
  };

  return (
    <div className="container p-4 mt-5 d-flex justify-content-center">
      <div className="card p-5 shadow-lg border-0 text-center w-100">
        <p className="fs-1 fw-bold">{dataOpening.name}</p>
        <button
          className="btn bg-blue p-2 mt-3 w-50 mx-auto"
          onClick={handleSubmit}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Opening;
