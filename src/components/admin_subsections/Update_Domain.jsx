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
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Update Domain</h2>
        <p className="text-gray-600">Manage existing domains</p>
      </div>

      {editDomain ? (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mb-6">
          <h3 className="text-xl font-bold mb-4">Edit Domain</h3>
          <form className="space-y-4" onSubmit={handleUpdate}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Extension</label>
              <input
                type="text"
                value={formData.extension}
                onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                Update
              </button>
              <button type="button" onClick={() => setEditDomain(null)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Extension
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {domains.map((domain) => (
                <tr key={domain._id}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{domain.extension}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">PKR {domain.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{domain.period}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(domain)}
                      className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(domain._id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
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
