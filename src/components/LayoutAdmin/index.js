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
      <div className="row h-100">
        <div className="col-2 w-20 bg-blue text-white p-3">
          <p className="fs-4 text-center fw-bold">Holland Test</p>
          {/* <img className="d-flex mx-auto" src={logo} width={150} /> */}
          <hr className="mx-2 mb-2 mt-4" />
          <div className="ms-3 d-flex pointer" onClick={() => navigate("/")}>
            <i class="fas fa-info-circle fa-fw mt-2"></i>
            <p className="ms-2 text-sidebar">Dashboard</p>
          </div>
          <hr className="mx-2 mt-0" />
          {role === "1" ? (
            <div
              className="ms-3 d-flex pointer"
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
              <hr className="mx-2 mt-0" />
              <div
                className="ms-3 d-flex pointer"
                onClick={() => navigate(`/settings/${idCompany}`)}
              >
                <i class="fas fa-cog mt-2"></i>
                <p className="ms-2 text-sidebar">Settings</p>
              </div>
            </>
          )}
          <hr className="mx-2 mt-0" />
        </div>
        <div className="col ps-0">
          <div className="shadow-sm p-3">
            <div className="d-flex justify-content-between">
              <img className="" src={logoCompany} width="auto" height={35} />
              {/* <p className="fs-4">{companyName}</p> */}
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
              v 1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
