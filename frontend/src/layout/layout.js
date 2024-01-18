import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./nav/nav";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../pages/productPage/productSlice";

export const Layout = () => {
  const menu = useSelector((state) => state.productsData.menuState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleMenu(false));
  }, []);
  return (
    <div
      className={`w-full bg-gray-100 min-h-screen `}
      onClick={() => {
        dispatch(toggleMenu(false));
      }}
    >
      <Nav />
      {console.log(menu)}
      <div
        className={`w-full dark:bg-[#202427] bg-white  min-h-screen py-8 px-2 ${
          menu ? "max-h-screen" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};
