import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = ({ component, ...rest }: any) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
