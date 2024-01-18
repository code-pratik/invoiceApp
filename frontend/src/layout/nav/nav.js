import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCube,
  faBriefcase,
  faFileAlt,
  faBars,
  faClose,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import DarkMode from "../../components/DarkMode/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../pages/productPage/productSlice";

const Nav = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkMode.theme);
  const menuOpen = useSelector((state) => state.productsData.menuState);
  const handelMenu = (e) => {
    e.stopPropagation();
    dispatch(toggleMenu());
  };

  return (
    <>
      <div className="w-screen   bg-[#1F2937] py-2 md:hidden fixed  z-60 ">
        <div className="md:hidden flex w-full justify-between">
          <button onClick={handelMenu} className="text-white px-4">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          <img src="/assets/images/logo.png" alt="Logo" className="h-12 " />
        </div>
      </div>
      <div className="md:flex md:w-full bg-gray-800 md:flex md:fixed   md:justify-between md:h-16  md:items-center">
        <ul
          className={`md:flex flex px-4 md:px-0
           md:h-16 text-white flex-col md:flex-row w-[200px]  md:w-fit items-start md:items-center justify-start py-6 md:py-0 ${
             menuOpen ? "md:translate-x-0" : "-translate-x-full"
           } md:translate-x-0 transition-transform ease-in-out duration-300 fixed md:static  bg-gray-800 h-screen`}
        >
          <FontAwesomeIcon
            icon={faClose}
            className="absolute right-5 top-3  md:hidden"
            onClick={handelMenu}
          />
          <li>
            <NavLink
              to="/"
              onClick={handelMenu}
              className={`nav-link px-4 py-2 inline-block hover:bg-gray-700 ${
                location.pathname === "/" && "text-green-400"
              }`}
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              onClick={handelMenu}
              className={`nav-link px-4 py-2 inline-block hover:bg-gray-700 ${
                location.pathname === "/products" && "text-green-400"
              }`}
            >
              <FontAwesomeIcon icon={faCube} className="mr-2" />
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jobs"
              onClick={handelMenu}
              className={`nav-link px-4 py-2 inline-block hover:bg-gray-700 ${
                location.pathname === "/jobs" && "text-green-400"
              }`}
            >
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/invoice"
              onClick={handelMenu}
              className={`nav-link px-4 py-2 inline-block hover:bg-gray-700 ${
                location.pathname === "/invoice" && "text-green-400"
              }`}
            >
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              Invoice
            </NavLink>
          </li>
          <li className=" ml-3 flex gap-2 items-center py-2">
            {theme === "dark" ? (
              <>
                <FontAwesomeIcon icon={faMoon} />
                <span>dark</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSun} />
                <span>Light</span>
              </>
            )}{" "}
            <DarkMode />
          </li>
        </ul>

        <div className="ml-auto md:ml-0 md:block hidden  md:block">
          <img src="/assets/images/logo.png" alt="Logo" className="h-12 " />
        </div>
      </div>
    </>
  );
};

export default Nav;
