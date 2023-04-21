import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [dataSettings, setDataSettings] = useState("");
  const [form, setForm] = useState({ opening: "", closing: "" });
  const { id } = useParams();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}holland/company/get_message/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataSettings(res.data);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .put(
        `${process.env.REACT_APP_URL}holland/company/setting`,
        { ...form, id_company: id },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <div className="card border-0 py-2 mx-3 shadow-lg my-4">
      <div className="card-body">
        <p className="text-blue fw-bold fs-4">Set Message</p>
        <div className="row">
          <div className="mb-3">
            <label>Opening Message:</label>
            <input
              type="text"
              name="opening"
              placeholder="opening"
              className="w-100 mt-1 rounded-3 p-2 border form-control"
              defaultValue={dataSettings?.opening}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Ending Message:</label>
            <input
              type="text"
              name="closing"
              placeholder="ending"
              className="w-100 mt-1 rounded-3 p-2 border form-control"
              defaultValue={dataSettings?.closing}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className="btn bg-blue w-25 float-right text-white"
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default Settings;
