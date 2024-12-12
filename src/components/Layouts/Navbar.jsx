import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "/images/menu_icon.svg";
import { PiSignOutDuotone, PiUserCircleDuotone } from "react-icons/pi";
import Button from "../Elements/Button";
import { useLogin } from "../../hooks/useLogin";
import ModalBox from "../Elements/ModalBox";
import { userLogout } from "../../api/services/authService";

const Navbar = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const username = useLogin(token);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeSidebar = () => {
    document.getElementById("my-drawer-3").checked = false;
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      await userLogout(refreshToken);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsModalOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    closeSidebar();
  };

  const closeModal = () => setIsModalOpen(false);

  const isAuthenticated = token;

  return (
    <div className="drawer drawer-end z-10">
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
            <ul className="menu menu-horizontal items-center gap-3">
              {!isAuthenticated ? (
                <div className="flex">
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
                </div>
              ) : (
                isAuthenticated && (
                  <div className="dropdown dropdown-end ml-4">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <PiUserCircleDuotone
                        size={"2.5rem"}
                        className="text-primary"
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-white rounded-box z-20 mt-8 w-52 p-2 shadow"
                    >
                      <li className="hover:bg-gray-100 rounded-md duration-150 ease-in-out mb-4">
                        <div className="flex border border-gray-300 p-1 h-full rounded-md items-center justify-center">
                          <PiUserCircleDuotone
                            size={"2rem"}
                            className="text-primary"
                          />
                          <p className="text-sm font-poppinsMedium ml-2 text-primary">
                            {username}
                          </p>
                        </div>
                      </li>
                      <li className="hover:bg-gray-100 rounded-md duration-150 ease-in-out p-1">
                        <NavLink
                          to="/"
                          className={({ isActive }) =>
                            isActive ? "text-black font-bold" : "text-gray-700"
                          }
                        >
                          Home
                        </NavLink>
                      </li>
                      <li className="hover:bg-gray-100 rounded-md duration-150 ease-in-out p-1">
                        <NavLink
                          to="/about"
                          className={({ isActive }) =>
                            isActive ? "text-black font-bold" : "text-gray-700"
                          }
                        >
                          About
                        </NavLink>
                      </li>
                      <li className="mb-4 hover:bg-gray-100 rounded-md duration-150 ease-in-out p-1">
                        <NavLink
                          to="/dashboard"
                          className={({ isActive }) =>
                            isActive ? "text-black font-bold" : "text-gray-700"
                          }
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="bg-red-600 text-white rounded-md p-1 hover:bg-black duration-150 ease-in-out">
                        <NavLink
                          onClick={openModal}
                          className="justify-between"
                        >
                          Logout
                          <span>
                            <PiSignOutDuotone size={"1.2rem"} />
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )
              )}
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
        <ul className="menu bg-white min-h-full w-1/2 p-4 flex items-center justify-between">
          <div className="flex flex-col justify-center items-center">
            {/* Sidebar content here */}
            <li className="mb-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold underline underline-offset-8"
                    : "text-gray-700 items-center"
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
            {isAuthenticated ? (
              <li className="mb-2">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold underline underline-offset-8"
                      : "text-gray-700"
                  }
                  onClick={closeSidebar}
                >
                  Dashboard
                </NavLink>
              </li>
            ) : (
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
            )}
          </div>
          {isAuthenticated && (
            <div className="w-full">
              <div className="flex border border-gray-300 p-2 rounded-md items-center justify-center mb-2">
                <PiUserCircleDuotone size={"2rem"} className="text-primary" />
                <p className="text-sm font-poppinsMedium ml-2 text-primary">
                  {username}
                </p>
              </div>
              <Button
                type="button"
                onClick={openModal}
                classname="bg-primary text-white w-full flex items-center justify-between hover:bg-black duration-150 ease-in-out"
              >
                Logout <PiSignOutDuotone size={"1.5rem"} />
              </Button>
            </div>
          )}
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <ModalBox
          primaryAction={handleLogout}
          secondaryAction={closeModal}
          title="Confirm Logout"
          description="Are you sure you want to logout?"
          primaryActionText="Logout"
          secondaryActionText="Cancel"
        />
      )}
    </div>
  );
};

export default Navbar;
