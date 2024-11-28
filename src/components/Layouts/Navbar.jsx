import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 font-poppins border-b border-b-slate-300">
      <div className="m-auto">
        <ul className="menu menu-horizontal px-1 font-poppinsMedium lg:text-base">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold underline underline-offset-8"
                  : "text-gray-700"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold underline underline-offset-8"
                  : "text-gray-700"
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold underline underline-offset-8"
                  : "text-gray-700"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold underline underline-offset-8"
                  : "text-gray-700"
              }
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
