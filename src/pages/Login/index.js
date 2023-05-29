import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/Cover Login-05.jpg";
import logo from "../../assets/Logo Assesment Center-06.png";

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
        localStorage.setItem("id_company", res.data.user.id_company);
        localStorage.setItem("name_company", res.data.user.company_name);
        localStorage.setItem("logo_company", res.data.user.logo_company);
        localStorage.setItem("auth", 1);
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
        <section className="vh-100">
      <div className="container-fluid">
      <div className="row">
      <div className="col card border-0">
          <div className="col-lg-10 my-auto mx-auto">
            <img className="d-flex mx-auto" src={logo} width={250} />
            <p className="text-center fs-3 fw-bold mt-1">Holland Test</p>
            <div class="form-group w-100 mt-4">
              {/* <label>Username:</label> */}
              <input
                type="text"
                name="username"
                className="form-control mt-1 border-bottom border-0"
                placeholder="username"
                onChange={handleChange}
              />
            </div>
            <div class="form-group w-100 mt-2">
              {/* <label>Password:</label> */}
              <input
                type="password"
                name="password"
                className="form-control mt-1 border-bottom border-0"
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
            <p className="text-center mt-4 text-xs">
              Copyright © Assessment Center Solutions 2023.
              <br />
              All rights reserved. v 1.0.0
            </p>
          </div>
        </div>

        <div className="col px-0 d-none d-sm-block">
          <img
            alt=""
            src={img}
            className="w-100 vh-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </div>
      </div>
    </div>
  </section>
  );
};

export default Login;
