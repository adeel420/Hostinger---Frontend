import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

const Update_Domain = () => {
  const [domains, setDomains] = useState([]);
  const [editDomain, setEditDomain] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const res = await axios.get(`${apiUrl}/domain/domains`);
      setDomains(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this domain?")) return;
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      await axios.delete(`${apiUrl}/domain/domains/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Domain deleted successfully!");
      fetchDomains();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete domain");
    }
  };

  const handleEdit = (domain) => {
    setEditDomain(domain._id);
    setFormData(domain);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      await axios.put(`${apiUrl}/domain/domains/${editDomain}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Domain updated successfully!");
      setEditDomain(null);
      fetchDomains();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update domain");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Update Domain</h2>
        <p className="text-gray-600 text-lg">Manage existing domains</p>
      </div>

      {editDomain ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold mb-6">Edit Domain</h3>
          <form className="space-y-6" onSubmit={handleUpdate}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Extension</label>
              <input
                type="text"
                value={formData.extension}
                onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 font-bold shadow-lg hover:shadow-xl transition-all">
                Update
              </button>
              <button type="button" onClick={() => setEditDomain(null)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 font-bold transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Extension
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Period
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {domains.map((domain) => (
                <tr key={domain._id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">{domain.extension}</td>
                  <td className="px-6 py-4 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">PKR {domain.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{domain.period}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(domain)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(domain._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
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

export default Update_Domain;
