import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaSearch,
  FaGlobe,
  FaCheckCircle,
  FaFilter,
  FaStar,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Domain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [domains, setDomains] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  // Test function to check if domains are loaded
  useEffect(() => {
    console.log("Domains loaded:", domains.length);
  }, [domains]);

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/domain/list`,
      );
      setDomains(response.data);
    } catch (error) {
      console.error("Error fetching domains:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a domain name");
      return;
    }

    setSearching(true);
    try {
      console.log("Searching for:", searchTerm);
      console.log(
        "API URL:",
        `${import.meta.env.VITE_SERVER_API}/domain/search`,
      );

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/domain/search`,
        { domainName: searchTerm },
      );

      console.log("Search results:", response.data);

      if (response.data && response.data.length > 0) {
        setSearchResults(response.data);
        toast.success(`Found ${response.data.length} results!`);
      } else {
        toast.error("No domains found");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error(
        error.response?.data?.error ||
          "Error searching domain. Please try again.",
      );
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleBuyDomain = (domain) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { type: "domain", domain } });
  };

  const popularExtensions = domains.filter((d) =>
    [".com", ".pk", ".net", ".org"].includes(d.extension),
  );

  const filteredDomains =
    selectedCategory === "all"
      ? domains
      : selectedCategory === "popular"
        ? popularExtensions
        : domains.filter((d) => d.extension.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl mb-16">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative px-8 py-16 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Domain Name
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Search and register your domain in seconds
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <form onSubmit={handleSearch}>
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-6 py-4 bg-gray-50 rounded-xl">
                <FaGlobe className="text-purple-600 text-2xl mr-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Find your perfect domain..."
                  className="flex-1 bg-transparent outline-none text-gray-800 text-lg font-medium placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={searching}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {searching ? "Searching..." : "Search Now"}
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 mt-4 text-sm">
            💡 Tip: Enter domain name without extension
          </p>
        </div>

        {searchResults.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Search Results
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {searchResults.map((result, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    {result.available ? (
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaCheckCircle className="text-white text-2xl" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-2xl font-bold">✕</span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {result.domainName}
                      </h3>
                      <p
                        className={`text-sm font-semibold ${
                          result.available ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {result.available ? "✓ Available" : "✗ Not Available"}
                      </p>
                    </div>
                  </div>
                  {result.available && (
                    <div className="text-right">
                      <p className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Rs {result.price}
                      </p>
                      <button
                        onClick={() => handleBuyDomain(result)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Popular Domain Extensions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularExtensions.map((domain) => (
              <div
                key={domain._id}
                className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                  {domain.extension}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  Rs {domain.price}
                  <span className="text-sm text-gray-600 block mt-1">
                    /{domain.period}
                  </span>
                </div>
                <button
                  onClick={() => handleBuyDomain(domain)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 cursor-pointer transition-all shadow-lg group-hover:shadow-xl"
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <FaFilter className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Filter Domains
                </h3>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full cursor-pointer text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                    selectedCategory === "all"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  All Domains
                </button>
                <button
                  onClick={() => setSelectedCategory("popular")}
                  className={`w-full text-left cursor-pointer px-4 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    selectedCategory === "popular"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FaStar /> Popular
                </button>
                <button
                  onClick={() => setSelectedCategory(".com")}
                  className={`w-full text-left cursor-pointer px-4 py-3 rounded-xl font-semibold transition-all ${
                    selectedCategory === ".com"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  .com Domains
                </button>
                <button
                  onClick={() => setSelectedCategory(".pk")}
                  className={`w-full cursor-pointer text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                    selectedCategory === ".pk"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  .pk Domains
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Why Choose Us?</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaShieldAlt className="text-white text-sm" />
                    </div>
                    <span className="text-gray-600 text-sm">Free WHOIS Privacy</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-white text-sm" />
                    </div>
                    <span className="text-gray-600 text-sm">Instant Activation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-white text-sm" />
                    </div>
                    <span className="text-gray-600 text-sm">Free DNS Management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {selectedCategory === "all" && "All Domain Pricing"}
              {selectedCategory === "popular" && "Popular Domains"}
              {selectedCategory === ".com" && ".com Domain Pricing"}
              {selectedCategory === ".pk" && ".pk Domain Pricing"}
            </h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-lg font-bold">
                        Extension
                      </th>
                      <th className="px-6 py-4 text-left text-lg font-bold">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-lg font-bold">
                        Period
                      </th>
                      <th className="px-6 py-4 text-center text-lg font-bold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDomains.map((domain, idx) => (
                      <tr
                        key={domain._id}
                        className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-purple-50 transition-colors`}
                      >
                        <td className="px-6 py-4 text-xl font-bold text-gray-900">
                          {domain.extension}
                        </td>
                        <td className="px-6 py-4 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Rs {domain.price}
                        </td>
                        <td className="px-6 py-4 text-gray-700 capitalize">
                          {domain.period}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleBuyDomain(domain)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 cursor-pointer transition-all shadow-lg hover:shadow-xl"
                          >
                            Buy Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="group text-center bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <FaGlobe className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Easy Management
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Manage all your domains from one dashboard
            </p>
          </div>
          <div className="group text-center bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <FaCheckCircle className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Free DNS</h3>
            <p className="text-gray-600 leading-relaxed">
              Free DNS management with every domain
            </p>
          </div>
          <div className="group text-center bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <FaSearch className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              24/7 Support
            </h3>
            <p className="text-gray-600 leading-relaxed">Expert support whenever you need it</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Domain;
