import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { userDetail } = useAuth();
  return userDetail ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
