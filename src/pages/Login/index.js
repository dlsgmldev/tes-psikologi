import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/Holland_hexagon_with_text_0.png";
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
    <>
      <div className="card my-5 mx-5 shadow-lg p-4 border-0">
        <img src={logo} width={150} />
        <div className="row no-gutter">
          <div className="col-md-6">
            <div className="container">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <p className="fs-1 mt-4 fw-bold">Login</p>
                <p className="">
                  Welcome back! You need to login to participate in this survey.
                </p>
                <div class="form-group w-100">
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
                  className="btn btn-success p-2 w-100 my-3"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-flex">
            <img alt="" src={img} className="img-login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
