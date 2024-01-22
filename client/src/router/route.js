import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import NavbarContainer from "../components/Navbar";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return (
    <>
      <NavbarContainer />
      <Outlet />
    </>
  );
};

export default PrivateRoute;
