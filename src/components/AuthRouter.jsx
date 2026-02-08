import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const token = localStorage.getItem("access");

  // ❌ User not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ User logged in
  return <Outlet />;
};

export default AuthGuard;
