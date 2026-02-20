import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaServer, FaEdit, FaTrash, FaBan } from "react-icons/fa";

const Services_Management = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({
    cpanelUsername: "",
    cpanelPassword: "",
    cpanelUrl: "",
    nameServer1: "",
    nameServer2: "",
    domainName: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/service/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
    } catch (error) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCredentials = (service) => {
    setSelectedService(service);
    setCredentials({
      cpanelUsername: service.cpanelUsername || "",
      cpanelPassword: service.cpanelPassword || "",
      cpanelUrl: service.cpanelUrl || "",
      nameServer1: service.nameServer1 || "",
      nameServer2: service.nameServer2 || "",
      domainName: service.domainName || "",
    });
    setShowModal(true);
  };

  const handleSubmitCredentials = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_SERVER_API}/service/admin/${selectedService._id}/credentials`,
        credentials,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Service activated! Credentials sent to customer.");
      setShowModal(false);
      fetchServices();
    } catch (error) {
      toast.error("Failed to activate service");
    }
  };

  const handleSuspend = async (id) => {
    if (!confirm("Suspend this service?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_SERVER_API}/service/admin/${id}/suspend`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Service suspended");
      fetchServices();
    } catch (error) {
      toast.error("Failed to suspend service");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service permanently?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_SERVER_API}/service/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Service deleted");
      fetchServices();
    } catch (error) {
      toast.error("Failed to delete service");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "active": return "bg-green-100 text-green-700";
      case "suspended": return "bg-red-100 text-red-700";
      case "expired": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Services Management
        </h2>
        <p className="text-gray-600 text-lg">Manage hosting services and add cPanel credentials</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
          <FaServer className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No services yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Service</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Expiry</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service._id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{service.serviceName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{service.userId?.email}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{service.planId?.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-4 py-1.5 text-xs font-bold rounded-full ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {service.expiryDate ? new Date(service.expiryDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {service.status === "pending" && (
                        <button
                          onClick={() => handleAddCredentials(service)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          title="Add Credentials"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                      )}
                      {service.status === "active" && (
                        <>
                          <button
                            onClick={() => handleAddCredentials(service)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Edit Credentials"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSuspend(service._id)}
                            className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                            title="Suspend"
                          >
                            <FaBan className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-3xl">
              <h3 className="text-2xl font-bold text-white">Add cPanel Credentials</h3>
            </div>
            <form onSubmit={handleSubmitCredentials} className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-3">Domain Name *</label>
                <input
                  type="text"
                  value={credentials.domainName}
                  onChange={(e) => setCredentials({...credentials, domainName: e.target.value})}
                  placeholder="example.com"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-3">cPanel Username *</label>
                <input
                  type="text"
                  value={credentials.cpanelUsername}
                  onChange={(e) => setCredentials({...credentials, cpanelUsername: e.target.value})}
                  placeholder="username"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-3">cPanel Password *</label>
                <input
                  type="text"
                  value={credentials.cpanelPassword}
                  onChange={(e) => setCredentials({...credentials, cpanelPassword: e.target.value})}
                  placeholder="password"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-3">cPanel URL *</label>
                <input
                  type="url"
                  value={credentials.cpanelUrl}
                  onChange={(e) => setCredentials({...credentials, cpanelUrl: e.target.value})}
                  placeholder="https://cpanel.example.com:2083"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-3">Name Server 1 *</label>
                  <input
                    type="text"
                    value={credentials.nameServer1}
                    onChange={(e) => setCredentials({...credentials, nameServer1: e.target.value})}
                    placeholder="ns1.example.com"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-3">Name Server 2 *</label>
                  <input
                    type="text"
                    value={credentials.nameServer2}
                    onChange={(e) => setCredentials({...credentials, nameServer2: e.target.value})}
                    placeholder="ns2.example.com"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                >
                  Activate Service & Send Email
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services_Management;
