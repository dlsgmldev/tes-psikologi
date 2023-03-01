import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Outlet, useNavigate } from "react-router-dom";

const LayoutAdmin = ({ children }) => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  return (
    <div className="wrapper">
      <div className="row h-100">
        <div className="col-2 bg-blue text-white p-3">
          <p className="fw-bold text-center fs-6">Dashboard Psikotes</p>
          <hr className="mx-2 mb-2 mt-4" />
          <div className="ms-3 d-flex pointer" onClick={() => navigate("/")}>
            <i class="fas fa-info-circle fa-fw mt-2"></i>
            <p className="ms-2 text-sidebar">Dashboard</p>
          </div>
          <hr className="mx-2 mt-0" />
          <div
            className="ms-3 d-flex pointer"
            onClick={() => navigate("/user-management")}
          >
            <i class="fas fa-user-alt fa-fw mt-2"></i>
            <p className="ms-2 text-sidebar">User Management</p>
          </div>
          <hr className="mx-2 mt-0" />
        </div>
        <div className="col ps-0">
          <div className="shadow-sm p-2">
            <div className="d-flex justify-content-end">
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
              Copyright © Digital Learning Solutions 2023. All rights reserved.
              v 1.0..0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
