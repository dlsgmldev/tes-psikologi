import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo Assesment Center-06.png";

const LayoutAdmin = ({ children }) => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const idCompany = localStorage.getItem("id_company");
  const companyName = localStorage.getItem("name_company");
  const logoCompany = localStorage.getItem("logo_company");

  return (
    <div className="wrapper">
      <div className="row h-100 ms-0">
        <div
          className="card border-0 border-radius-0 col-2 text-white"
          style={{ backgroundColor: "#6C9BCF", width:"18%" }}
        >
          <p className="fs-3 fw-bold mt-4 pb-2 border-bottom border-3 border-light">Assessment Test</p>
          <div className="ms-2 d-flex pointer mt-3" onClick={() => navigate("/")}>
            <i class="fas fa-info-circle fa-fw mt-2"></i>
            <p className="ms-2 text-sidebar">Dashboard</p>
          </div>
          {role === "1" ? (
            <div
              className="ms-2 d-flex pointer"
              onClick={() => navigate("/client-management")}
            >
              <i class="fas fa-user-alt fa-fw mt-2"></i>
              <p className="ms-2 text-sidebar">Company Management</p>
            </div>
          ) : (
            <>
              <div
                className="ms-3 d-flex pointer"
                onClick={() => navigate(`/user-management/${idCompany}`)}
              >
                <i class="fas fa-user-alt fa-fw mt-2"></i>
                <p className="ms-2 text-sidebar">User Management</p>
              </div>
              <div
                className="ms-3 d-flex pointer"
                onClick={() => navigate(`/settings/${idCompany}`)}
              >
                <i class="fas fa-cog mt-2"></i>
                <p className="ms-2 text-sidebar">Settings</p>
              </div>
            </>
          )}
          <span className="mt-auto text-xs text-center">v 1.0.0</span>
        </div>
        <div className="col ps-0">
          <div className="shadow-sm p-3">
            <div className="d-flex justify-content-between">
              <img className="" src={logoCompany} width="auto" height={35} />
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
          <div className="footer mt-2">
            <p className="text-center">
              Copyright © Assessment Center Solutions 2023. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
