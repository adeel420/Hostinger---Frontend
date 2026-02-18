import { Plus } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";

const Create_Domain = () => {
  const [formData, setFormData] = useState({
    extension: ".com",
    price: "",
    period: "yearly",
    whmcsTldId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      
      await axios.post(
        `${apiUrl}/domain/domains`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert("Domain created successfully!");
      setFormData({ extension: ".com", price: "", period: "yearly", whmcsTldId: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create domain");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Create Domain</h2>
        <p className="text-gray-600 text-lg">Add new domain extension</p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Domain Extension
            </label>
            <select
              value={formData.extension}
              onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 font-medium"
            >
              <option>.com</option>
              <option>.pk</option>
              <option>.net</option>
              <option>.org</option>
              <option>.co</option>
              <option>.io</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Price (PKR/year)
            </label>
            <input
              type="number"
              placeholder="2500"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              WHMCS TLD ID (Optional)
            </label>
            <input
              type="number"
              placeholder="1"
              value={formData.whmcsTldId}
              onChange={(e) => setFormData({ ...formData, whmcsTldId: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Domain
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create_Domain;
