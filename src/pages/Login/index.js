import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/login img2@72x.png";
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
      .post(`${process.env.REACT_APP_URL}ac/login`, form, {
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
          .get(`${process.env.REACT_APP_URL}ac/get_test`, {
            headers: {
              Authorization: "Bearer " + res.data.user.token.access_token,
            },
          })
          .then((res) => {
            navigate("/home");
          });
      })
      .catch((err) => {
        alert("failed");
      });
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col card border-0">
            <div className="col-lg-10 my-auto mx-auto">
              <img
                className="d-flex mx-auto"
                src="https://apidls.onegml.com/ac/holland_image/1690252267.jpg"
                width={120}
              />
              <p className="text-center fs-3 fw-bold mt-3 text-blue">
                Tes Psikologi
              </p>
              <div class="form-group w-100 mt-4">
                <input
                  type="text"
                  name="username"
                  className="form-control mt-1 border-bottom border-0"
                  placeholder="email"
                  onKeyUp={handleKeypress}
                  onChange={handleChange}
                />
              </div>
              <div class="form-group w-100 mt-2">
                <input
                  type="password"
                  name="password"
                  className="form-control mt-1 border-bottom border-0"
                  placeholder="password"
                  onKeyUp={handleKeypress}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn bg-blue p-2 w-100 mt-3 text-white"
                onClick={handleSubmit}
                type="submit"
              >
                Masuk
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
