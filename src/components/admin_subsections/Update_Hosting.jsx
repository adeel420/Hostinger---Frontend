import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

const Update_Hosting = () => {
  const [plans, setPlans] = useState([]);
  const [editPlan, setEditPlan] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const res = await axios.get(`${apiUrl}/hosting/plans`);
      setPlans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this plan?")) return;
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      await axios.delete(`${apiUrl}/hosting/plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Plan deleted successfully!");
      fetchPlans();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete plan");
    }
  };

  const handleEdit = (plan) => {
    setEditPlan(plan._id);
    setFormData({ ...plan, features: plan.features.join(", ") });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      await axios.put(
        `${apiUrl}/hosting/plans/${editPlan}`,
        { ...formData, features: formData.features.split(",").map((f) => f.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Plan updated successfully!");
      setEditPlan(null);
      fetchPlans();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update plan");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Update Hosting Plans
        </h2>
        <p className="text-gray-600">Manage existing hosting plans</p>
      </div>

      {editPlan ? (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mb-6">
          <h3 className="text-xl font-bold mb-4">Edit Plan</h3>
          <form className="space-y-4" onSubmit={handleUpdate}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                rows="3"
              ></textarea>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                Update
              </button>
              <button type="button" onClick={() => setEditPlan(null)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                {plan.hostingType}
              </span>
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-4">
              PKR {plan.price}<span className="text-sm text-gray-600">/{plan.period}</span>
            </p>
            <ul className="space-y-2 mb-4 text-sm text-gray-600">
              <li>• {plan.storage} Storage</li>
              <li>• {plan.bandwidth} Bandwidth</li>
              <li>• {plan.websites}</li>
              {plan.features.slice(0, 2).map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(plan)}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => handleDelete(plan._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Update_Hosting;
