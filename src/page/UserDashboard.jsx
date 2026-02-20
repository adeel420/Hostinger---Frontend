import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBox, FaUser, FaSignOutAlt, FaClock, FaCheckCircle, FaTimesCircle, FaServer, FaExternalLinkAlt } from "react-icons/fa";

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("services");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserData();
    fetchOrders();
    fetchServices();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data");
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/service/my-services`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "pending": return <FaClock className="text-yellow-600" />;
      case "approved": return <FaCheckCircle className="text-blue-600" />;
      case "active": return <FaCheckCircle className="text-green-600" />;
      case "rejected": return <FaTimesCircle className="text-red-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "approved": return "bg-blue-100 text-blue-700";
      case "active": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  My Dashboard
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-2 mb-8 border border-gray-100 flex gap-2">
          <button
            onClick={() => setActiveTab("services")}
            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
              activeTab === "services"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            My Services
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
              activeTab === "orders"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            My Orders
          </button>
        </div>

        {activeTab === "services" && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center">
                <FaServer className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Hosting Services
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12">
                <FaServer className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">No active services yet</p>
                <button
                  onClick={() => navigate("/hosting")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                >
                  Browse Hosting Plans
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service._id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{service.serviceName}</h3>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            service.status === "active" ? "bg-green-100 text-green-700" :
                            service.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                            service.status === "suspended" ? "bg-red-100 text-red-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {service.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Created: {new Date(service.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Rs {service.amount}
                        </p>
                        <p className="text-gray-600 text-sm capitalize">{service.billingCycle.replace("month", " Month")}</p>
                      </div>
                    </div>

                    {service.status === "active" && service.cpanelUrl && (
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 mb-4">
                        <h4 className="font-bold text-gray-900 mb-3">Service Details</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600">Domain:</p>
                            <p className="font-bold text-gray-900">{service.domainName || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Username:</p>
                            <p className="font-bold text-gray-900">{service.cpanelUsername}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Password:</p>
                            <p className="font-bold text-gray-900">{service.cpanelPassword}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Expiry Date:</p>
                            <p className="font-bold text-gray-900">
                              {service.expiryDate ? new Date(service.expiryDate).toLocaleDateString() : "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <p className="text-gray-600 text-xs mb-2">Name Servers:</p>
                          <div className="grid grid-cols-2 gap-2">
                            <p className="font-bold text-gray-900 text-sm">{service.nameServer1}</p>
                            <p className="font-bold text-gray-900 text-sm">{service.nameServer2}</p>
                          </div>
                        </div>
                        <a
                          href={service.cpanelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                        >
                          <FaExternalLinkAlt />
                          Login to cPanel
                        </a>
                      </div>
                    )}

                    {service.status === "pending" && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-r-xl">
                        <p className="text-sm text-yellow-900">
                          <strong>Pending Activation:</strong> Admin will add your cPanel credentials within 6 hours after payment verification.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <FaBox className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Orders
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <FaBox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">No orders yet</p>
                <button
                  onClick={() => navigate("/hosting")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                >
                  Browse Hosting Plans
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {order.planId?.name}
                          </h3>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Order ID: #{order._id.slice(-8)} • {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          PKR {order.amount}
                        </p>
                        <p className="text-gray-600 text-sm capitalize">{order.paymentMethod.replace("_", " ")}</p>
                      </div>
                    </div>

                    {order.planId && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-xl p-4">
                        <div>
                          <p className="text-gray-600 text-xs">Storage</p>
                          <p className="font-bold text-gray-900">{order.planId.storage}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs">Bandwidth</p>
                          <p className="font-bold text-gray-900">{order.planId.bandwidth}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs">Websites</p>
                          <p className="font-bold text-gray-900">{order.planId.websites}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs">Email Accounts</p>
                          <p className="font-bold text-gray-900">{order.planId.emailAccounts}</p>
                        </div>
                      </div>
                    )}

                    {order.adminNote && (
                      <div className="mt-4 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                        <p className="text-sm text-blue-900">
                          <strong>Admin Note:</strong> {order.adminNote}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
