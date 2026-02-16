import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-3" : "bg-white/95 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-purple-600 text-2xl md:text-3xl font-bold tracking-wider" style={{ fontFamily: "Noto Sans KR, sans-serif" }}>
            WARU
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium">
              Services
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium">
              Contact
            </Link>
            <Link to="/login" className="px-5 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-all text-sm uppercase tracking-wide font-semibold rounded">
              Login
            </Link>
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-gray-200 pt-4">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium">
              Services
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors text-sm uppercase tracking-wide font-medium">
              Contact
            </Link>
            <Link to="/login" className="px-5 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-all text-sm uppercase tracking-wide font-semibold rounded text-center">
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
