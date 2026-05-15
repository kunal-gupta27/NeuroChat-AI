import { useState, useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { MyContaxt } from "../MyContaxt";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { theme, setTheme, logout, user } =
    useContext(MyContaxt);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setShowProfile(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-3 shadow-lg rounded-md border-b border-white/10">

        {/* Logo */}
        <NavLink
          to="/"
          className="hover:text-shadow-lg hover:text-shadow-purple-600 font-semibold cursor-pointer text-2xl transition-all duration-300"
        >
          NeuroChat AI{" "}
          <i className="fa-solid fa-chevron-down text-sm"></i>
        </NavLink>

        {/* Right Side */}
        <div
          className="relative"
          ref={dropdownRef}
        >
          <div className="flex gap-8 items-center">

            {/* Home */}
            <NavLink
              to="/"
              className="font-medium hover:text-purple-400 transition-all duration-300"
            >
              Home
            </NavLink>

            {/* About */}
            <NavLink
              to="/about"
              className="font-medium hover:text-purple-400 transition-all duration-300"
            >
              About
            </NavLink>

            {/* Theme */}
            <button
              onClick={() =>
                setTheme((prev) => !prev)
              }
            >
              {theme === true ? (
                <i className="cursor-pointer fa-solid fa-circle-half-stroke text-lg hover:text-shadow-lg hover:text-shadow-purple-600 hover:shadow-lg hover:shadow-purple-600 transition-all duration-300"></i>
              ) : (
                <i className="cursor-pointer fa-regular fa-moon text-lg hover:text-shadow-lg hover:text-shadow-purple-600 transition-all duration-300"></i>
              )}
            </button>

            {/* Share */}
            <NavLink to={"#"}>
              <i
                className={`fa-solid fa-arrow-up-from-bracket text-lg hover:text-shadow-purple-600 bg-transparent transition-all duration-300 ${
                  theme &&
                  "hover:shadow-lg hover:shadow-purple-600"
                }`}
              ></i>
            </NavLink>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() =>
                  setShowProfile((prev) => !prev)
                }
                className="bg-purple-600 rounded-full p-1 hover:shadow-lg hover:shadow-purple-600 transition-all duration-300"
              >
                <i className="fa-solid fa-user text-white text-lg p-2"></i>
              </button>

              {showProfile && user && (
                <div className="absolute right-0 top-16 w-72 rounded-2xl bg-[#1f1f1f]/95 backdrop-blur-xl border border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] p-5 z-50">

                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-5">

                    {/* Avatar */}
                    <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                      {user.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    {/* User Info */}
                    <div>
                      <h2 className="font-bold text-lg text-white">
                        {user.name}
                      </h2>

                      <p className="text-sm text-gray-400 break-all">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 my-4"></div>

                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:scale-[1.02] transition-all duration-300 font-semibold text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Menu */}
            <button
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              <i
                className={`cursor-pointer fa-solid fa-ellipsis-vertical text-lg hover:text-shadow-lg hover:text-shadow-purple-600 transition-all duration-300 ${
                  theme &&
                  "hover:shadow-lg hover:shadow-purple-600"
                }`}
              ></i>
            </button>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className={`absolute top-16 right-0 w-48 ${
                theme === true
                  ? "bg-[#323232]"
                  : "bg-white text-black"
              } rounded-2xl px-3 py-3 text-left z-50 shadow-[0_0_20px_rgba(0,0,0,0.25)] border border-white/10`}
            >
              <div className="menu-item hover:text-purple-400 transition-all duration-300 py-2 cursor-pointer">
                <i className="fa-solid fa-gear mr-2"></i>
                Settings
              </div>

              <div className="menu-item hover:text-purple-400 transition-all duration-300 py-2 cursor-pointer">
                <i className="fa-solid fa-cloud-arrow-up mr-2"></i>
                Upgrade Plan
              </div>

              <div className="border-t border-white/10 my-2"></div>

              <div className="menu-item py-2">
                {user ? (
                  <button
                    onClick={logout}
                    className="hover:text-red-400 transition-all duration-300"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                    Logout
                  </button>
                ) : (
                  <div>
                    <i className="fa-solid fa-arrow-right-to-bracket mr-2"></i>
                    Login
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;