import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Common/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
