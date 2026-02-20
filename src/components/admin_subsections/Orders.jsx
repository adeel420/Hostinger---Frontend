import { Eye, Check, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_SERVER_API}/api/orders/${orderId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Order approved successfully");
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to approve order");
    }
  };

  const handleReject = async (orderId) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_SERVER_API}/api/orders/${orderId}/reject`, 
        { adminNote: reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order rejected");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to reject order");
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
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Orders</h2>
        <p className="text-gray-600 text-lg">Manage customer orders</p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Plan Details</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-purple-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">#{order._id.slice(-8)}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-bold text-gray-900">{order.customerDetails?.name}</p>
                        <p className="text-gray-600">{order.customerDetails?.email}</p>
                        <p className="text-gray-500 text-xs">{order.customerDetails?.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-bold text-gray-900">{order.planId?.name || 'N/A'}</p>
                        <p className="text-gray-600 text-xs capitalize">{order.billingCycle?.replace('month', ' Month')}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Rs {order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-1.5 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setSelectedOrder(order); setShowModal(true); }}
                          className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {order.status === "pending" && (
                          <>
                            <button 
                              onClick={() => handleApprove(order._id)}
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              title="Approve Order"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleReject(order._id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              title="Reject Order"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-3xl">
              <h3 className="text-2xl font-bold text-white">Order Details</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-4">
                <h4 className="font-bold text-gray-900 mb-3">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Name</p>
                    <p className="font-bold">{selectedOrder.customerDetails?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-bold">{selectedOrder.customerDetails?.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="font-bold">{selectedOrder.customerDetails?.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 mb-4">
                <h4 className="font-bold text-gray-900 mb-3">Order Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Order ID</p>
                    <p className="font-bold">#{selectedOrder._id.slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Plan</p>
                    <p className="font-bold">{selectedOrder.planId?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Billing Cycle</p>
                    <p className="font-bold capitalize">{selectedOrder.billingCycle?.replace('month', ' Month')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Amount</p>
                    <p className="font-bold text-purple-600">Rs {selectedOrder.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Created At</p>
                    <p className="font-bold text-sm">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Verification Deadline</p>
                    <p className="font-bold text-sm text-orange-600">{new Date(selectedOrder.verificationDeadline).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 mb-4">
                <h4 className="font-bold text-gray-900 mb-3">Payment Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Payment Method</p>
                    <p className="font-bold capitalize">{selectedOrder.paymentMethod?.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Transaction ID</p>
                    <p className="font-bold">{selectedOrder.transactionId}</p>
                  </div>
                  {selectedOrder.paymentNotes && (
                    <div className="col-span-2">
                      <p className="text-gray-600 text-sm">Payment Notes</p>
                      <p className="font-bold">{selectedOrder.paymentNotes}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedOrder.paymentProof && (
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-900 font-bold mb-3">Payment Proof</p>
                  <img src={selectedOrder.paymentProof} alt="Payment Proof" className="rounded-xl w-full max-h-96 object-contain border-2 border-gray-200" />
                </div>
              )}

              <div className="flex gap-3">
                {selectedOrder.status === "pending" && (
                  <>
                    <button
                      onClick={() => { handleApprove(selectedOrder._id); setShowModal(false); }}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:opacity-90 flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Approve Order
                    </button>
                    <button
                      onClick={() => { handleReject(selectedOrder._id); setShowModal(false); }}
                      className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:opacity-90 flex items-center justify-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      Reject Order
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
