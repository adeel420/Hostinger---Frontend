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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect{" "}
            <span className="text-[#9810fa]">Domain Name</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search and register your domain in seconds
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <form onSubmit={handleSearch}>
            <div className="bg-white rounded-full shadow-2xl p-3 flex items-center gap-3">
              <FaGlobe className="text-[#9810fa] text-2xl ml-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type domain name here..."
                className="flex-1 text-lg px-4 py-3 border-0 outline-none focus:outline-none focus:ring-0"
                style={{ background: "transparent" }}
              />
              <button
                type="submit"
                disabled={searching}
                className="bg-[#9810fa] text-white px-8 py-3 rounded-full font-bold hover:bg-[#7a0cbf] cursor-pointer disabled:bg-gray-400"
              >
                {searching ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 mt-4 text-sm">
            💡 Tip: Enter domain name without extension
          </p>
        </div>

        {searchResults.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {searchResults.map((result, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    {result.available ? (
                      <FaCheckCircle className="text-green-500 text-2xl" />
                    ) : (
                      <div className="text-red-500 text-2xl">✕</div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {result.domainName}
                      </h3>
                      <p
                        className={`text-sm ${result.available ? "text-green-600" : "text-red-600"}`}
                      >
                        {result.available ? "Available" : "Not Available"}
                      </p>
                    </div>
                  </div>
                  {result.available && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#9810fa] mb-2">
                        Rs {result.price}
                      </p>
                      <button
                        onClick={() => handleBuyDomain(result)}
                        className="bg-[#9810fa] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
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

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Domain Extensions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularExtensions.map((domain) => (
              <div
                key={domain._id}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-4xl font-bold text-[#9810fa] mb-2">
                  {domain.extension}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  Rs {domain.price}
                  <span className="text-sm text-gray-600">
                    /{domain.period}
                  </span>
                </div>
                <button
                  onClick={() => handleBuyDomain(domain)}
                  className="w-full bg-[#9810fa] text-white py-2 rounded-lg font-semibold hover:bg-[#7b03d2] cursor-pointer transition-all"
                >
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <FaFilter className="text-[#9711f5] text-xl" />
                <h3 className="text-xl font-bold text-gray-900">
                  Filter Domains
                </h3>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === "all"
                      ? "bg-[#9711f5] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Domains
                </button>
                <button
                  onClick={() => setSelectedCategory("popular")}
                  className={`w-full text-left cursor-pointer px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    selectedCategory === "popular"
                      ? "bg-[#9711f5] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaStar /> Popular
                </button>
                <button
                  onClick={() => setSelectedCategory(".com")}
                  className={`w-full text-left cursor-pointer px-4 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === ".com"
                      ? "bg-[#9711f5] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  .com Domains
                </button>
                <button
                  onClick={() => setSelectedCategory(".pk")}
                  className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === ".pk"
                      ? "bg-[#9711f5] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  .pk Domains
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Why Choose Us?</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <FaShieldAlt className="text-[#9711f5] mt-1" />
                    <span className="text-gray-600">Free WHOIS Privacy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaClock className="text-[#9711f5] mt-1" />
                    <span className="text-gray-600">Instant Activation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-[#9711f5] mt-1" />
                    <span className="text-gray-600">Free DNS Management</span>
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
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#9711f5] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-lg font-semibold">
                        Extension
                      </th>
                      <th className="px-6 py-4 text-left text-lg font-semibold">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-lg font-semibold">
                        Period
                      </th>
                      <th className="px-6 py-4 text-center text-lg font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDomains.map((domain, idx) => (
                      <tr
                        key={domain._id}
                        className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors`}
                      >
                        <td className="px-6 py-4 text-xl font-bold text-gray-900">
                          {domain.extension}
                        </td>
                        <td className="px-6 py-4 text-xl font-bold text-[#9711f5]">
                          Rs {domain.price}
                        </td>
                        <td className="px-6 py-4 text-gray-700 capitalize">
                          {domain.period}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleBuyDomain(domain)}
                            className="bg-[#9711f5] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#7007ba] cursor-pointer transition-all"
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

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-[#fbf5ff] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGlobe className="text-[#980ffc] text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Easy Management
            </h3>
            <p className="text-gray-600">
              Manage all your domains from one dashboard
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Free DNS</h3>
            <p className="text-gray-600">
              Free DNS management with every domain
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">Expert support whenever you need it</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Domain;
