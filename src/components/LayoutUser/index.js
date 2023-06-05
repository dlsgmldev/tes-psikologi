import React from "react";
import { Dropdown } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo Assesment Center-06.png";

const LayoutUser = ({ children }) => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const logoCompany = localStorage.getItem("logo_company");

  return (
    <div>
      <div className="header d-flex p-3 border shadow rounded-3">
        <img alt="" src={logo} width="auto" height={60}></img>
        <p className="mx-3 fw-bold my-auto">X</p>
        <img
          className="my-auto"
          alt=""
          src={logoCompany}
          width="auto"
          height={38}
        ></img>
        <div className="d-flex justify-content-end mt-2 ms-auto">
          <Dropdown>
            <Dropdown.Toggle className="d-flex" variant="none">
              <i class="far fa-user-circle fs-4"></i>
              <span className="ms-2">{name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  navigate("/login");
                  localStorage.clear();
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {children} <Outlet />
    </div>
  );
};

export default LayoutUser;
