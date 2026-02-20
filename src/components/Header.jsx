import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Popover, Space } from "antd";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const content = (
    <div className="w-[150px]">
      {user?.role === 1 ? (
        <li
          onClick={() => navigate("/admin_dashboard")}
          className="hover:bg-[#9810fa] hover:text-white p-2 cursor-pointer text-black flex gap-2 items-center text-[18px] font-semibold rounded"
        >
          <MdDashboard /> Admin Panel
        </li>
      ) : (
        <li
          onClick={() => navigate("/dashboard")}
          className="hover:bg-[#9810fa] hover:text-white p-2 cursor-pointer text-black flex gap-2 items-center text-[18px] font-semibold rounded"
        >
          <MdDashboard /> My Dashboard
        </li>
      )}

      <li className="hover:bg-[#9810fa] hover:text-white p-2 cursor-pointer text-black flex gap-2 items-center text-[18px] font-semibold rounded">
        <FaUser /> Profile
      </li>

      <li
        className="hover:bg-[#9810fa] hover:text-white p-2 cursor-pointer text-black flex gap-2 items-center text-[18px] font-semibold rounded"
        onClick={handleLogout}
      >
        <MdLogout /> Logout
      </li>
    </div>
  );

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/user/login-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-2xl py-3"
          : "bg-white/95 backdrop-blur-lg py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              HostPro
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {[
              "/",
              "/hosting",
              "/domain",
              "/about",
              "/services",
              "/contact",
            ].map((path, index) => {
              const labels = [
                "Home",
                "Hosting",
                "Domain",
                "About",
                "Services",
                "Contact",
              ];
              return (
                <Link
                  key={index}
                  to={path}
                  className="text-gray-700 hover:text-purple-600 transition-colors text-sm font-semibold relative group"
                >
                  {labels[index]}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              );
            })}

            {token ? (
              <Popover content={content} trigger="click">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white h-10 w-10 md:h-12 md:w-12 flex items-center justify-center font-bold cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-all">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
              </Popover>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-bold rounded-xl shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-gray-200 pt-4">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-purple-600 text-sm uppercase font-medium"
            >
              Home
            </Link>
            <Link
              to="/hosting"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-purple-600 text-sm uppercase font-medium"
            >
              Hosting
            </Link>
            <Link
              to="/domain"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-purple-600 text-sm uppercase font-medium"
            >
              Domain
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-purple-600 text-sm uppercase font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-purple-600 text-sm uppercase font-medium"
            >
              Services
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-purple-600 text-sm uppercase font-medium"
            >
              Contact
            </Link>

            {/* Mobile Auth Section */}
            {token ? (
              <nav>
                {user?.role === 1 ? (
                  <button
                    onClick={() => {
                      navigate("/admin_dashboard");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-gray-700 hover:text-purple-600"
                  >
                    <MdDashboard /> Admin Panel
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-gray-700 hover:text-purple-600"
                  >
                    <MdDashboard /> My Dashboard
                  </button>
                )}

                <button className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
                  <FaUser /> Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600"
                >
                  <MdLogout /> Logout
                </button>
              </nav>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 text-sm uppercase font-semibold rounded text-center"
              >
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
