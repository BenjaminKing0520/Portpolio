import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaBriefcase,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaPalette,
} from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("green"); // 🌈 theme state

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Projects", path: "/projects", icon: <FaBriefcase /> },
    { name: "ContactUs", path: "/contact", icon: <FaEnvelope /> },
  ];

  /* 🎨 Theme Colors */
  const colors =
    theme === "green"
      ? {
          main: "#4ADE80",
          hover: "#7EFF3D",
          gradient: "from-[#41C715] via-[#7EFF3D] to-[#41C715]",
        }
      : {
          main: "#38BDF8",
          hover: "#0EA5E9",
          gradient: "from-[#38BDF8] via-[#0EA5E9] to-[#38BDF8]",
        };

  return (
    <nav
      className="fixed w-full top-0 z-50 backdrop-blur-lg shadow-lg border-b transition-colors duration-300"
      style={{
        backgroundColor: "#010204",
        borderColor: `${colors.main}80`,
        color: colors.main,
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Logo */}
        <h1
          className="text-2xl font-bold whitespace-nowrap animate-runText"
          style={{ color: colors.main }}
        >
          Portfolio
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 text-lg font-medium">
            {menuItems.map((item, index) => {
              const active = location.pathname === item.path;
              return (
                <li
                  key={index}
                  className="relative group rounded-xl px-3 py-2 flex items-center space-x-2 cursor-pointer"
                >
                  <span
                    style={{
                      color: active ? colors.hover : colors.main,
                    }}
                    className="transition-colors duration-300"
                  >
                    {item.icon}
                  </span>

                  <Link
                    to={item.path}
                    style={{
                      color: active ? colors.hover : colors.main,
                    }}
                    className="transition-all duration-300"
                  >
                    {item.name}
                  </Link>

                  {/* underline */}
                  <span
                    className="absolute left-1 top-full h-[2px] rounded-full transition-all duration-500"
                    style={{
                      width: active ? "100%" : "0",
                      backgroundColor: colors.hover,
                    }}
                  ></span>

                  <span
                    className="absolute left-1 top-full h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: colors.hover }}
                  ></span>
                </li>
              );
            })}
          </ul>

          {/* 🌈 Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "green" ? "blue" : "green")}
            className="ml-4 px-3 py-2 rounded-full border transition-all duration-300 hover:scale-110"
            style={{
              borderColor: colors.main,
              color: colors.main,
            }}
            title="Switch Theme"
          >
            <FaPalette />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl focus:outline-none"
            style={{ color: colors.main }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-max-h duration-500 overflow-hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        } backdrop-blur-lg`}
        style={{ backgroundColor: "#010204" }}
      >
        <ul className="flex flex-col px-6 py-3 space-y-2">
          {menuItems.map((item, index) => {
            const active = location.pathname === item.path;
            return (
              <li
                key={index}
                className="flex items-center space-x-2 rounded-xl px-3 py-2 cursor-pointer"
              >
                <span style={{ color: active ? colors.hover : colors.main }}>
                  {item.icon}
                </span>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  style={{ color: active ? colors.hover : colors.main }}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}

          {/* 🌈 Mobile Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "green" ? "blue" : "green")}
            className="mt-3 px-4 py-2 rounded-full border text-center"
            style={{
              borderColor: colors.main,
              color: colors.main,
            }}
          >
            Switch Theme
          </button>
        </ul>
      </div>

      {/* Bottom Glow Line */}
      <div
        className={`h-[2px] w-full bg-gradient-to-r ${colors.gradient} animate-pulse`}
      ></div>
    </nav>
  );
}
