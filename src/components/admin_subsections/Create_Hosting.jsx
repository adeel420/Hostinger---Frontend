import { Plus } from "lucide-react";
import React from "react";

const Create_Hosting = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create Hosting Plan
        </h2>
        <p className="text-gray-600">Add new hosting plan</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Name
            </label>
            <input
              type="text"
              placeholder="Starter"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (PKR/month)
            </label>
            <input
              type="number"
              placeholder="1500"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage (GB)
            </label>
            <input
              type="number"
              placeholder="10"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bandwidth
            </label>
            <input
              type="text"
              placeholder="Unlimited"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features (comma separated)
            </label>
            <textarea
              placeholder="Free SSL, 24/7 Support"
              rows="3"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            ></textarea>
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
