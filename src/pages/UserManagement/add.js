import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    fullname: "",
    telp: "",
    unit: "",
    jabatan: "",
    divisi: "",
    nip: "",
  });
  const { id } = useParams();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}ac/usermanagement/add`,
        {
          ...form,
          id_company: id,
          role: 2,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        navigate(`/user-management/${id}`);
      })
      .catch((err) => {});
  };

  return (
    <div className="card border-0 py-2 mx-3 shadow-lg my-4">
      <div className="card-body">
        <p className="text-blue fw-bold fs-4">Add User</p>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={form.username}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Password:</label>
              <input
                type="text"
                name="password"
                placeholder="password"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Name:</label>
              <input
                type="text"
                name="fullname"
                placeholder="name"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={form.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Telp:</label>
              <input
                type="number"
                name="telp"
                placeholder="telp"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={form.telp}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label>Unit:</label>
              <input
                type="text"
                name="unit"
                placeholder="unit"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={form.unit}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Jabatan:</label>
              <input
                type="text"
                name="jabatan"
                placeholder="jabatan"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={form.jabatan}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>Divisi:</label>
              <input
                type="text"
                name="divisi"
                placeholder="divisi"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={form.divisi}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label>NIP:</label>
              <input
                type="number"
                name="nip"
                placeholder="nip"
                className="w-100 mt-1 rounded-3 p-2 border form-control"
                value={form.nip}
                onChange={handleChange}
              />
            </div>
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

export default AddUser;
