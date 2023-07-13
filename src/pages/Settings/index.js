import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const Settings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [dataMessage, setDataMessage] = useState([""]);
  const [dataSelectedAssessment, setDataSelectedAssessment] = useState([""]);
  const [dataOptions, setDataOptions] = useState([""]);
  const [form, setForm] = useState({ opening: "", closing: "" });
  const [idTest, setIdtest] = useState(0);
  const { id } = useParams();

  const handleChange = (e) => {
    const index = dataMessage.findIndex((p) => p.id == e.target.id);
    const data = dataMessage.find((p) => p.id == e.target.id);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    dataMessage[index] = {
      id: e.target.id,
      opening: form.opening ? form.opening : data.opening,
      closing: form.closing ? form.closing : data.closing,
      name: data.name,
    };
  };

  const handleSelect = (selectedOption) => {
    const id = selectedOption.map((item) => ({ id: item.value }));
    setIdtest(id);
    setDataSelectedAssessment(selectedOption);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL}ac/company/setting/get_assessment/${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        const assessment = res.data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setDataSelectedAssessment(assessment);
      });
    axios
      .get(`${process.env.REACT_APP_URL}ac/company/setting/get_message/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setDataMessage(res.data.data);
      });
    axios
      .get(`${process.env.REACT_APP_URL}ac/get_test_option`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const option = res.data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setDataOptions(option);
      });
  }, []);

  const handleSubmitAssessment = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/company/setting/set_assessment/${id}`,
        { data: idTest },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };

  const handleSubmitMessage = () => {
    axios
      .put(
        `${process.env.REACT_APP_URL}ac/company/setting/set_message`,
        { data: dataMessage },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };

  return (
    <div className="">
      <div className="card border-0 p-3 mx-3 shadow-lg my-4">
        <p className="text-blue fw-bold fs-4">Set Assessment</p>
        <div className="mb-3">
          <label>Set Assessment:</label>
          <Select
            value={dataSelectedAssessment}
            isMulti
            name="test"
            options={dataOptions}
            className="basic-multi-select mt-1"
            classNamePrefix="select"
            onChange={handleSelect}
          />
        </div>
        <div
          className="btn bg-blue w-25 float-right text-white"
          onClick={handleSubmitAssessment}
        >
          Submit
        </div>
      </div>
      <div className="card border-0 p-3 mx-3 shadow-lg my-4">
        {dataMessage.map((item) => (
          <>
            <p className="text-blue fw-bold fs-4">Set Message ({item.name})</p>
            <div className="row">
              <div className="mb-3">
                <label>Opening Message:</label>
                <input
                  type="text"
                  name="opening"
                  placeholder="opening"
                  id={item.id}
                  className="w-100 mt-1 rounded-3 p-2 border form-control"
                  defaultValue={item.opening}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Ending Message:</label>
                <input
                  type="text"
                  name="closing"
                  placeholder="ending"
                  id={item.id}
                  className="w-100 mt-1 rounded-3 p-2 border form-control"
                  defaultValue={item.closing}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        ))}
        <div
          className="btn bg-blue w-25 float-right text-white"
          onClick={handleSubmitMessage}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default Settings;
