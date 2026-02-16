import { Plus } from "lucide-react";
import React from "react";

const Create_Domain = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Domain</h2>
        <p className="text-gray-600">Add new domain to the system</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain Name
            </label>
            <input
              type="text"
              placeholder="example.com"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (PKR)
            </label>
            <input
              type="number"
              placeholder="2500"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extension
            </label>
            <select className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500">
              <option>.com</option>
              <option>.pk</option>
              <option>.net</option>
              <option>.org</option>
            </select>
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
