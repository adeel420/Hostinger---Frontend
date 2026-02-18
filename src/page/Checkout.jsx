import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, plan, domain } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "bank",
  });
  const [paymentProof, setPaymentProof] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!type || (!plan && !domain)) {
    navigate("/");
    return null;
  }

  const item = plan || domain;
  const price = item.price;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.paymentMethod === "bank" && !paymentProof) {
      toast.error("Please upload payment proof");
      return;
    }

    setLoading(true);
    try {
      const orderData = new FormData();
      orderData.append("type", type);
      orderData.append("itemId", item._id);
      orderData.append("name", formData.name);
      orderData.append("email", formData.email);
      orderData.append("phone", formData.phone);
      orderData.append("address", formData.address);
      orderData.append("paymentMethod", formData.paymentMethod);
      orderData.append("amount", price);
      
      if (paymentProof) {
        orderData.append("paymentProof", paymentProof);
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/order/create`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Order placed successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Complete Your Order
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="border-b pb-4 mb-4">
                <p className="text-gray-600 text-sm mb-2">
                  {type === "hosting" ? "Hosting Plan" : "Domain"}
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {type === "hosting" ? plan.name : domain.domainName || domain.extension}
                </p>
              </div>

              {type === "hosting" && (
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage:</span>
                    <span className="font-semibold">{plan.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bandwidth:</span>
                    <span className="font-semibold">{plan.bandwidth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Websites:</span>
                    <span className="font-semibold">{plan.websites}</span>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">Rs {price}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-purple-600">
                  <span>Total:</span>
                  <span>Rs {price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-4">
                  Payment Method *
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-600 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === "bank"}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="font-semibold">Bank Transfer</span>
                  </label>
                  
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-600 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="easypaisa"
                      checked={formData.paymentMethod === "easypaisa"}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="font-semibold">EasyPaisa</span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-600 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="jazzcash"
                      checked={formData.paymentMethod === "jazzcash"}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="font-semibold">JazzCash</span>
                  </label>
                </div>
              </div>

              {formData.paymentMethod === "bank" && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Bank Details:</h3>
                  <p className="text-sm text-gray-700">
                    Account Title: WARU Hosting<br />
                    Account Number: 1234567890<br />
                    Bank: HBL<br />
                    IBAN: PK12HABB0000001234567890
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Payment Proof *
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-all disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaCheckCircle />
                    Place Order
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
