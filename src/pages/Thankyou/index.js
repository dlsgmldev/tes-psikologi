import axios from "axios";
import React, { useEffect, useState } from "react";

const Thankyou = () => {
  const [dataEnding, setDataEnding] = useState("");
  const token = localStorage.getItem("token");
  const idCompany = localStorage.getItem("id_company");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}holland/company/get_message/${idCompany}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataEnding(res.data.closing);
      });
  }, []);

  return (
    <div className="fs-1 p-5 mt-5 text-center fw-bold">
      {dataEnding}
    </div>
  );
};

export default Thankyou;
