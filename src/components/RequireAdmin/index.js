import React from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role === "2") {
    return <Navigate to="/test" replace />;
  }

  return children;
};

export default RequireAdmin;
