import { Plus } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";

const Create_Hosting = () => {
  const [formData, setFormData] = useState({
    name: "",
    hostingType: "shared",
    price: "",
    period: "monthly",
    storage: "",
    bandwidth: "",
    websites: "",
    emailAccounts: "",
    cpuCores: "",
    ram: "",
    features: "",
    isPopular: false,
    whmcsProductId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      
      await axios.post(
        `${apiUrl}/hosting/plans`,
        {
          ...formData,
          features: formData.features.split(",").map((f) => f.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert("Hosting plan created successfully!");
      setFormData({
        name: "",
        hostingType: "shared",
        price: "",
        period: "monthly",
        storage: "",
        bandwidth: "",
        websites: "",
        emailAccounts: "",
        cpuCores: "",
        ram: "",
        features: "",
        isPopular: false,
        whmcsProductId: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create plan");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create Hosting Plan
        </h2>
        <p className="text-gray-600">Add new hosting plan</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hosting Type
            </label>
            <select
              value={formData.hostingType}
              onChange={(e) => setFormData({ ...formData, hostingType: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="shared">Shared Hosting</option>
              <option value="wordpress">WordPress Hosting</option>
              <option value="vps">VPS Hosting</option>
              <option value="dedicated">Dedicated Server</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Name
            </label>
            <input
              type="text"
              placeholder="Starter"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (PKR)
              </label>
              <input
                type="number"
                placeholder="1500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period
              </label>
              <select
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage
              </label>
              <input
                type="text"
                placeholder="10 GB"
                value={formData.storage}
                onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bandwidth
              </label>
              <input
                type="text"
                placeholder="Unlimited"
                value={formData.bandwidth}
                onChange={(e) => setFormData({ ...formData, bandwidth: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Websites
              </label>
              <input
                type="text"
                placeholder="1 Website"
                value={formData.websites}
                onChange={(e) => setFormData({ ...formData, websites: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Accounts
              </label>
              <input
                type="text"
                placeholder="10 Accounts"
                value={formData.emailAccounts}
                onChange={(e) => setFormData({ ...formData, emailAccounts: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>
          {(formData.hostingType === "vps" || formData.hostingType === "dedicated") && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPU Cores
                </label>
                <input
                  type="text"
                  placeholder="4 Cores"
                  value={formData.cpuCores}
                  onChange={(e) => setFormData({ ...formData, cpuCores: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RAM
                </label>
                <input
                  type="text"
                  placeholder="8 GB"
                  value={formData.ram}
                  onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WHMCS Product ID (Optional)
            </label>
            <input
              type="number"
              placeholder="123"
              value={formData.whmcsProductId}
              onChange={(e) => setFormData({ ...formData, whmcsProductId: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features (comma separated)
            </label>
            <textarea
              placeholder="Free SSL, 24/7 Support, Daily Backups"
              rows="3"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            ></textarea>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPopular}
              onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium text-gray-700">
              Mark as Popular
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Hosting Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create_Hosting;
