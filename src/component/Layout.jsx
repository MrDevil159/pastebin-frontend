import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Common/NavBar";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Layout;
