import { CheckCircle, XCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Payments = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const res = await axios.get(`${apiUrl}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.filter((o) => o.status === "pending"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    if (!confirm("Approve this order? It will be provisioned in WHMCS.")) return;
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      await axios.put(`${apiUrl}/api/orders/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Order approved and provisioned!");
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to approve order");
    }
  };

  const handleReject = async (id) => {
    const adminNote = prompt("Reason for rejection:");
    if (!adminNote) return;
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      await axios.put(`${apiUrl}/api/orders/${id}/reject`, { adminNote }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Order rejected!");
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to reject order");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Payment Verification
        </h2>
        <p className="text-gray-600 text-lg">Approve or reject payment proofs</p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Proof
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">#{order._id.slice(-6)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.userId?.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.orderType}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.paymentMethod}</td>
                  <td className="px-6 py-4 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">PKR {order.amount}</td>
                  <td className="px-6 py-4">
                    {order.paymentProof ? (
                      <a
                        href={order.paymentProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View Screenshot
                      </a>
                    ) : (
                      <span className="text-gray-400">No proof</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleApprove(order._id)}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReject(order._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
