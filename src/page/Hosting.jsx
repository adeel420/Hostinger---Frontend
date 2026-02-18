import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheck, FaServer, FaWordpress, FaCloud, FaDatabase } from "react-icons/fa";
import toast from "react-hot-toast";

const Hosting = () => {
  const [activeTab, setActiveTab] = useState("shared");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hostingTypes = [
    { id: "shared", name: "Shared Hosting", icon: <FaServer />, desc: "Perfect for beginners" },
    { id: "wordpress", name: "WordPress Hosting", icon: <FaWordpress />, desc: "Optimized for WP" },
    { id: "vps", name: "VPS Hosting", icon: <FaCloud />, desc: "More power & control" },
    { id: "dedicated", name: "Dedicated Server", icon: <FaDatabase />, desc: "Maximum performance" },
  ];

  useEffect(() => {
    fetchPlans();
  }, [activeTab]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/hosting/plans?type=${activeTab}`
      );
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (plan) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { type: "hosting", plan } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-purple-600">Hosting Plan</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fast, secure, and reliable hosting solutions for every need
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {hostingTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`p-6 rounded-xl transition-all duration-300 ${
                activeTab === type.id
                  ? "bg-purple-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:shadow-md"
              }`}
            >
              <div className="text-3xl mb-2 flex justify-center">{type.icon}</div>
              <h3 className="font-bold text-sm md:text-base mb-1">{type.name}</h3>
              <p className="text-xs opacity-80">{type.desc}</p>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                  plan.isPopular ? "ring-4 ring-purple-600" : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-purple-600 text-white text-center py-2 font-semibold text-sm">
                    ⭐ MOST POPULAR
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-purple-600">Rs {plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{plan.storage} Storage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{plan.bandwidth} Bandwidth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{plan.websites} Websites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{plan.emailAccounts} Email Accounts</span>
                    </li>
                    {plan.cpuCores && (
                      <li className="flex items-start gap-2">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{plan.cpuCores} CPU Cores</span>
                      </li>
                    )}
                    {plan.ram && (
                      <li className="flex items-start gap-2">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{plan.ram} RAM</span>
                      </li>
                    )}
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleBuyNow(plan)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      plan.isPopular
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-gray-100 text-purple-600 hover:bg-purple-600 hover:text-white"
                    }`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {plans.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No plans available for this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hosting;
