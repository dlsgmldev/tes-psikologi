import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_URL}holland/login`, form, {
        headers: {
          Authorization:
            "Basic " +
            btoa(
              `${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`
            ),
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.user.token.access_token);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("name", res.data.user.fullname);
        axios
          .get(`${process.env.REACT_APP_URL}holland/get_status`, {
            headers: {
              Authorization: "Bearer " + res.data.user.token.access_token,
            },
          })
          .then((res) => {
            res.data?.status === "0"
              ? navigate("/opening")
              : res.data?.status === "1"
              ? navigate("/test")
              : res.data?.status === "2"
              ? navigate("/thankyou")
              : navigate("/");
          });
      })
      .catch((err) => {
        alert("failed");
      });
  };

  return (
    <div className="container d-flex p-4 w-100 mt-3">
      <div className="w-100">
        <p className="fs-1">Login</p>
        <p className="text-secondary">
          You need to login to participate in this survey
        </p>
        <div class="form-group w-100">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            class="form-control mt-1"
            placeholder="username"
            onChange={handleChange}
          />
        </div>
        <div class="form-group w-100 mt-2">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            class="form-control mt-1"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <button
          className="btn btn-success p-2 w-100 mt-3"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
      <div>
        <img
          alt=""
          src="https://i.pinimg.com/originals/2b/bb/a0/2bbba0a9be459261ee162908eb88d15b.png"
          className="img-login"
        />
      </div>
    </div>
  );
};

export default Login;
