import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheck, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";

const Hosting = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/hosting/plans`);
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
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl mb-16">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative px-8 py-16 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              Shared Hosting Plans
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Fast & Reliable
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Perfect for websites, blogs, and small businesses. Get verified within 6 hours!
            </p>
          </div>
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
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all hover:scale-105 border-2 ${
                  plan.isPopular ? "border-purple-500 shadow-2xl" : "border-gray-200"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm">
                    ⭐ POPULAR
                  </div>
                )}
                
                <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      {plan.pricing?.monthly}
                    </span>
                    <span className="text-gray-500 ml-2 text-lg">PKR/month</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{plan.storage} Storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{plan.bandwidth} Bandwidth</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{plan.websites} Websites</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{plan.emailAccounts} Email Accounts</span>
                    </li>
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleBuyNow(plan)}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {plans.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No plans available</p>
          </div>
        )}

        {/* 6 Hours Verification Notice */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
              <FaClock className="text-white text-3xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Quick Verification Process</h3>
              <p className="text-gray-600">Get your hosting activated within 6 hours</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <h4 className="font-bold text-gray-900 mb-2">Choose Plan</h4>
              <p className="text-gray-600 text-sm">Select your preferred hosting plan and billing cycle</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <h4 className="font-bold text-gray-900 mb-2">Submit Payment</h4>
              <p className="text-gray-600 text-sm">Upload payment proof and transaction details</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <h4 className="font-bold text-gray-900 mb-2">Get Activated</h4>
              <p className="text-gray-600 text-sm">Receive cPanel credentials within 6 hours via email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hosting;
