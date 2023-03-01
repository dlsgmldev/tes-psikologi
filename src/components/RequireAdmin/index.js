import React from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role !== "1") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAdmin;
