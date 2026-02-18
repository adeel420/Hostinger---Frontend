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
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Domain</h2>
        <p className="text-gray-600">Add new domain extension</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain Extension
            </label>
            <select
              value={formData.extension}
              onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (PKR/year)
            </label>
            <input
              type="number"
              placeholder="2500"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WHMCS TLD ID (Optional)
            </label>
            <input
              type="number"
              placeholder="1"
              value={formData.whmcsTldId}
              onChange={(e) => setFormData({ ...formData, whmcsTldId: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold flex items-center justify-center gap-2"
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
