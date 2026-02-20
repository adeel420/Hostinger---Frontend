import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle, FaShieldAlt, FaLock, FaBolt, FaUniversity, FaMobileAlt, FaWallet } from "react-icons/fa";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "bank_transfer",
    transactionId: "",
    paymentNotes: "",
  });
  const [billingCycle, setBillingCycle] = useState("1month");
  const [paymentProof, setPaymentProof] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!plan) {
    navigate("/");
    return null;
  }

  const getPriceForCycle = () => {
    switch(billingCycle) {
      case "1month": return plan.pricing?.monthly || 0;
      case "3months": return plan.pricing?.quarterly || plan.pricing?.monthly * 3;
      case "6months": return plan.pricing?.semiannually || plan.pricing?.monthly * 6;
      case "12months": return plan.pricing?.annually || plan.pricing?.monthly * 12;
      default: return plan.pricing?.monthly || 0;
    }
  };

  const price = getPriceForCycle();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.transactionId) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!paymentProof) {
      toast.error("Please upload payment proof");
      return;
    }

    setLoading(true);
    try {
      const orderData = new FormData();
      orderData.append("planId", plan._id);
      orderData.append("billingCycle", billingCycle);
      orderData.append("customerDetails", JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }));
      orderData.append("amount", price);
      orderData.append("paymentMethod", formData.paymentMethod);
      orderData.append("transactionId", formData.transactionId);
      orderData.append("paymentNotes", formData.paymentNotes);
      orderData.append("paymentProof", paymentProof);

      console.log("Submitting order with:", {
        planId: plan._id,
        billingCycle,
        amount: price,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionId
      });

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/api/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Order response:", response.data);
      toast.success("Order submitted! Admin will verify within 6 hours.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Order error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl mb-6 shadow-2xl">
            <FaCheckCircle className="text-white text-4xl" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Complete Your Order
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            You're just one step away from getting started. Fill in your details and complete the payment.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 bg-white rounded-xl p-3 shadow-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <FaShieldAlt className="text-white text-sm" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Secure Payment</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white rounded-xl p-3 shadow-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <FaLock className="text-white text-sm" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Data Protected</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white rounded-xl p-3 shadow-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <FaBolt className="text-white text-sm" />
            </div>
            <span className="text-sm font-semibold text-gray-700">6 Hour Setup</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-24 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Order Summary</h2>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
                <p className="text-gray-600 text-sm mb-2 font-semibold">Hosting Plan</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {plan.name}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-3">Billing Cycle</label>
                <div className="space-y-2">
                  <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    billingCycle === "1month" ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-purple-300"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="billingCycle"
                        value="1month"
                        checked={billingCycle === "1month"}
                        onChange={(e) => setBillingCycle(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="font-bold text-gray-900">1 Month</span>
                    </div>
                    <span className="font-bold text-purple-600">Rs {plan.pricing?.monthly}</span>
                  </label>
                  {plan.pricing?.quarterly && (
                    <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      billingCycle === "3months" ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-purple-300"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="billingCycle"
                          value="3months"
                          checked={billingCycle === "3months"}
                          onChange={(e) => setBillingCycle(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="font-bold text-gray-900">3 Months</span>
                      </div>
                      <span className="font-bold text-purple-600">Rs {plan.pricing?.quarterly}</span>
                    </label>
                  )}
                  {plan.pricing?.semiannually && (
                    <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      billingCycle === "6months" ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-purple-300"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="billingCycle"
                          value="6months"
                          checked={billingCycle === "6months"}
                          onChange={(e) => setBillingCycle(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="font-bold text-gray-900">6 Months</span>
                      </div>
                      <span className="font-bold text-purple-600">Rs {plan.pricing?.semiannually}</span>
                    </label>
                  )}
                  {plan.pricing?.annually && (
                    <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      billingCycle === "12months" ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-purple-300"
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="billingCycle"
                          value="12months"
                          checked={billingCycle === "12months"}
                          onChange={(e) => setBillingCycle(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="font-bold text-gray-900">12 Months</span>
                      </div>
                      <span className="font-bold text-purple-600">Rs {plan.pricing?.annually}</span>
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                  <span className="text-gray-600 font-semibold">Storage:</span>
                  <span className="font-bold text-gray-900">{plan.storage}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                  <span className="text-gray-600 font-semibold">Bandwidth:</span>
                  <span className="font-bold text-gray-900">{plan.bandwidth}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                  <span className="text-gray-600 font-semibold">Websites:</span>
                  <span className="font-bold text-gray-900">{plan.websites}</span>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-semibold">Subtotal:</span>
                  <span className="font-bold text-gray-900">Rs {price}</span>
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4">
                  <div className="flex justify-between items-center text-white">
                    <span className="text-lg font-bold">Total Amount:</span>
                    <span className="text-2xl font-bold">Rs {price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                  <FaLock className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Billing Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-700 font-bold mb-3">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-3">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-3">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03XX-XXXXXXX"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-3">Transaction ID *</label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="Enter transaction ID"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-4">Payment Method *</label>
                <div className="grid md:grid-cols-3 gap-4">
                  <label className={`group cursor-pointer transition-all ${
                    formData.paymentMethod === "bank_transfer" ? "ring-2 ring-purple-600" : "hover:shadow-lg"
                  }`}>
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 text-center">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all ${
                        formData.paymentMethod === "bank_transfer"
                          ? "bg-gradient-to-br from-blue-600 to-cyan-600 scale-110"
                          : "bg-gradient-to-br from-blue-100 to-cyan-100"
                      }`}>
                        <FaUniversity className={`text-2xl ${
                          formData.paymentMethod === "bank_transfer" ? "text-white" : "text-blue-600"
                        }`} />
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={formData.paymentMethod === "bank_transfer"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-bold text-gray-900">Bank Transfer</span>
                    </div>
                  </label>
                  
                  <label className={`group cursor-pointer transition-all ${
                    formData.paymentMethod === "easypaisa" ? "ring-2 ring-purple-600" : "hover:shadow-lg"
                  }`}>
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 text-center">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all ${
                        formData.paymentMethod === "easypaisa"
                          ? "bg-gradient-to-br from-green-600 to-emerald-600 scale-110"
                          : "bg-gradient-to-br from-green-100 to-emerald-100"
                      }`}>
                        <FaMobileAlt className={`text-2xl ${
                          formData.paymentMethod === "easypaisa" ? "text-white" : "text-green-600"
                        }`} />
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="easypaisa"
                        checked={formData.paymentMethod === "easypaisa"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-bold text-gray-900">EasyPaisa</span>
                    </div>
                  </label>

                  <label className={`group cursor-pointer transition-all ${
                    formData.paymentMethod === "jazzcash" ? "ring-2 ring-purple-600" : "hover:shadow-lg"
                  }`}>
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 text-center">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all ${
                        formData.paymentMethod === "jazzcash"
                          ? "bg-gradient-to-br from-orange-600 to-red-600 scale-110"
                          : "bg-gradient-to-br from-orange-100 to-red-100"
                      }`}>
                        <FaWallet className={`text-2xl ${
                          formData.paymentMethod === "jazzcash" ? "text-white" : "text-orange-600"
                        }`} />
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="jazzcash"
                        checked={formData.paymentMethod === "jazzcash"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-bold text-gray-900">JazzCash</span>
                    </div>
                  </label>
                </div>
              </div>

              {formData.paymentMethod === "bank_transfer" && (
                <div className="mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                      <FaUniversity className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Bank Transfer Details</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between bg-white rounded-xl p-3">
                      <span className="font-semibold">Account Title:</span>
                      <span className="font-bold">WARU Hosting</span>
                    </div>
                    <div className="flex justify-between bg-white rounded-xl p-3">
                      <span className="font-semibold">Account Number:</span>
                      <span className="font-bold">1234567890</span>
                    </div>
                    <div className="flex justify-between bg-white rounded-xl p-3">
                      <span className="font-semibold">Bank:</span>
                      <span className="font-bold">HBL</span>
                    </div>
                    <div className="flex justify-between bg-white rounded-xl p-3">
                      <span className="font-semibold">IBAN:</span>
                      <span className="font-bold">PK12HABB0000001234567890</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-3">Payment Notes (Optional)</label>
                <textarea
                  name="paymentNotes"
                  value={formData.paymentNotes}
                  onChange={handleChange}
                  placeholder="Any additional notes about your payment"
                  rows="3"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
                ></textarea>
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-3">Upload Payment Proof *</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 file:text-white file:font-semibold file:cursor-pointer hover:file:from-purple-700 hover:file:to-pink-700"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">Upload a screenshot or photo of your payment receipt</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-xl" />
                    <span>Complete Order - Rs {price}</span>
                  </>
                )}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-green-600" />
                  <span>Verified in 6 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLock className="text-blue-600" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
