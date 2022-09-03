import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

function ProtectedRoute({ children }) {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
