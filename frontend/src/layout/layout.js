import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./nav/nav";

export const Layout = () => {
  return (
    <div className="w-full bg-gray-100 min-h-screen ">
      <Nav />
      <div className="w-full dark:bg-[#202427] bg-white  min-h-screen py-8 px-2">
        <Outlet />
      </div>
    </div>
  );
};
