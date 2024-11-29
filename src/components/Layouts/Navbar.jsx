import React from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "/images/menu_icon.svg";

const Navbar = () => {
  const closeSidebar = () => {
    document.getElementById("my-drawer-3").checked = false;
  };

  return (
    <div className="drawer drawer-end font-poppins">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 border-b border-gray-300 w-full">
          <div className="flex-1">
            <Link to="/">
              <img src="/images/Logo.svg" className="w-36 sm:w-44" alt="" />
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              <li className="hover:bg-gray-200 rounded duration-150 ease-in-out">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold underline underline-offset-8"
                      : "text-gray-700"
                  }
                  onClick={closeSidebar}
                >
                  Home
                </NavLink>
              </li>
              <li className="hover:bg-gray-200 rounded duration-150 ease-in-out">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold underline underline-offset-8"
                      : "text-gray-700"
                  }
                  onClick={closeSidebar}
                >
                  About
                </NavLink>
              </li>
              <li className="hover:bg-gray-200 rounded duration-150 ease-in-out">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold underline underline-offset-8"
                      : "text-gray-700"
                  }
                  onClick={closeSidebar}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <img src={MenuIcon} alt="" />
            </label>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-white min-h-full w-1/2 p-4 flex items-center">
          {/* Sidebar content here */}
          <li className="mb-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold underline underline-offset-8"
                  : "text-gray-700"
              }
              onClick={closeSidebar}
            >
              Home
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold underline underline-offset-8"
                  : "text-gray-700"
              }
              onClick={closeSidebar}
            >
              About
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold underline underline-offset-8"
                  : "text-gray-700"
              }
              onClick={closeSidebar}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
