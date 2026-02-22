import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  // if (!isLoggedIn) {
  // return <Navigate to="/login" replace />;
  // }
  return children;
};

export default PrivateRoute;
