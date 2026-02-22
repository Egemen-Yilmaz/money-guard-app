import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// restricted: if true, logged-in users will be redirected away (e.g. login/register pages)
const PublicRoute = ({ children, restricted = false }) => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  if (isLoggedIn && restricted) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default PublicRoute;
