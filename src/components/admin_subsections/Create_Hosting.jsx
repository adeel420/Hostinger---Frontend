import { Plus } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";

const Create_Hosting = () => {
  const [formData, setFormData] = useState({
    name: "",
    monthlyPrice: "",
    quarterlyPrice: "",
    semiannuallyPrice: "",
    annuallyPrice: "",
    storage: "",
    bandwidth: "",
    websites: "",
    emailAccounts: "",
    features: "",
    isPopular: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_SERVER_API;
      
      await axios.post(
        `${apiUrl}/hosting/plans`,
        {
          name: formData.name,
          pricing: {
            monthly: parseFloat(formData.monthlyPrice),
            quarterly: formData.quarterlyPrice ? parseFloat(formData.quarterlyPrice) : null,
            semiannually: formData.semiannuallyPrice ? parseFloat(formData.semiannuallyPrice) : null,
            annually: formData.annuallyPrice ? parseFloat(formData.annuallyPrice) : null,
          },
          storage: formData.storage,
          bandwidth: formData.bandwidth,
          websites: formData.websites,
          emailAccounts: formData.emailAccounts,
          features: formData.features.split(",").map((f) => f.trim()),
          isPopular: formData.isPopular,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert("Hosting plan created successfully!");
      setFormData({
        name: "",
        monthlyPrice: "",
        quarterlyPrice: "",
        semiannuallyPrice: "",
        annuallyPrice: "",
        storage: "",
        bandwidth: "",
        websites: "",
        emailAccounts: "",
        features: "",
        isPopular: false,
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create plan");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Create Hosting Plan
        </h2>
        <p className="text-gray-600 text-lg">Add new shared hosting plan</p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-bold mb-3">
              Plan Name
            </label>
            <input
              type="text"
              placeholder="Starter Plan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
              required
            />
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Pricing (PKR)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Monthly Price *
                </label>
                <input
                  type="number"
                  placeholder="1500"
                  value={formData.monthlyPrice}
                  onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Quarterly (3 months)
                </label>
                <input
                  type="number"
                  placeholder="4000"
                  value={formData.quarterlyPrice}
                  onChange={(e) => setFormData({ ...formData, quarterlyPrice: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Semi-annually (6 months)
                </label>
                <input
                  type="number"
                  placeholder="7500"
                  value={formData.semiannuallyPrice}
                  onChange={(e) => setFormData({ ...formData, semiannuallyPrice: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Annually (12 months)
                </label>
                <input
                  type="number"
                  placeholder="14000"
                  value={formData.annuallyPrice}
                  onChange={(e) => setFormData({ ...formData, annuallyPrice: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-3">
                Storage
              </label>
              <input
                type="text"
                placeholder="10 GB SSD"
                value={formData.storage}
                onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-3">
                Bandwidth
              </label>
              <input
                type="text"
                placeholder="Unlimited"
                value={formData.bandwidth}
                onChange={(e) => setFormData({ ...formData, bandwidth: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-3">
                Websites
              </label>
              <input
                type="text"
                placeholder="1 Website"
                value={formData.websites}
                onChange={(e) => setFormData({ ...formData, websites: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-3">
                Email Accounts
              </label>
              <input
                type="text"
                placeholder="10 Accounts"
                value={formData.emailAccounts}
                onChange={(e) => setFormData({ ...formData, emailAccounts: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-3">
              Features (comma separated)
            </label>
            <textarea
              placeholder="Free SSL, 24/7 Support, Daily Backups, cPanel Access"
              rows="3"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all"
            ></textarea>
          </div>
          <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-xl">
            <input
              type="checkbox"
              checked={formData.isPopular}
              onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
              className="w-5 h-5"
            />
            <label className="text-gray-700 font-bold">
              Mark as Popular Plan
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:opacity-90 font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Hosting Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create_Hosting;
