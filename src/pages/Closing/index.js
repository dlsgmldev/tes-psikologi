import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Closing = () => {
  const [dataEnding, setDataEnding] = useState("");
  const token = localStorage.getItem("token");
  const idCompany = localStorage.getItem("id_company");
  const {id}=useParams()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}ac/company/get_closing_test/${idCompany}/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataEnding(res.data.data.closing);
      });
  }, []);

  return (
    <div className="fs-1 p-5 mt-5 text-center fw-bold">
      {dataEnding}
    </div>
  );
};

export default Closing;
