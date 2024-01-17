import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import DarkMode from "../../components/DarkMode";

const Nav = () => {
  const location = useLocation();

  return (
    <div className="w-full flex px-4 bg-gray-800 fixed justify-between items-center">
      <ul className="flex justify-center items-center h-16 text-white">
        <li>
          <NavLink
            exact
            to="/"
            className={`nav-link px-4 py-2 inline-block hover:bg-gray-700 ${
              location.pathname === "/" && "border-b-2"
            }`}
            activeClassName="active-nav-link"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/products"
            className={`nav-link px-4 py-2 inline-block hover:bg-gray-700 ${
              location.pathname === "/products" && "border-b-2"
            }`}
            activeClassName="active-nav-link"
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/jobs"
            className={`nav-link px-4 py-2 inline-block hover:bg-gray-700 ${
              location.pathname === "/jobs" && "border-b-2 "
            }`}
            activeClassName="active-nav-link"
          >
            Jobs
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/invoice"
            className={`nav-link px-4 py-2 inline-block hover:bg-gray-700 ${
              location.pathname === "/invoice" && "border-b-2"
            }`}
            activeClassName="active-nav-link"
          >
            Invoice
          </NavLink>
        </li>
        <li className="pt-2 ml-2">
          <DarkMode/>
        </li>
      </ul>
      <div>
        <img
          src="/assets/images/logo.png"
          alt="Logo"
          className="ml-auto h-12 bg-black"
        />
      </div>
    </div>
  );
};

export default Nav;
