import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

function AuthRoute({ children }) {
  const { accessToken } = useAuth();
  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthRoute;
