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
      {user?.role === 1 && (
        <li
          onClick={() => navigate("/admin_dashboard")}
          className="hover:bg-[#9810fa] hover:text-white p-2 cursor-pointer text-black flex gap-2 items-center text-[18px] font-semibold rounded"
        >
          <MdDashboard /> Dashboard
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
          ? "bg-white shadow-lg py-3"
          : "bg-white/95 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-purple-600 text-2xl md:text-3xl font-bold tracking-wider"
            style={{ fontFamily: "Noto Sans KR, sans-serif" }}
          >
            WARU
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium"
            >
              Contact
            </Link>
            {token ? (
              <Popover
                content={content}
                trigger="click"
                className="bg-[#9810fa] text-white h-[50px] w-[50px] flex items-center justify-center font-bold cursor-pointer rounded-full "
              >
                <span className="bg-[#9810fa] text-white h-[50px] w-[50px] flex items-center justify-center font-bold cursor-pointer rounded-full ">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              </Popover>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-all text-sm uppercase tracking-wide font-semibold rounded"
              >
                Login
              </Link>
            )}
          </nav>

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

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-gray-200 pt-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-all text-sm uppercase tracking-wide font-semibold rounded text-center"
            >
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
