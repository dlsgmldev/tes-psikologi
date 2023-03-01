import React from "react";
import { Navigate } from "react-router-dom";

const RequireUser = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role !== 2) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireUser;
