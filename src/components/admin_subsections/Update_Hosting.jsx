import React from "react";

const Update_Hosting = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Update Hosting Plans
        </h2>
        <p className="text-gray-600">Manage existing hosting plans</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
          <p className="text-3xl font-bold text-purple-600 mb-4">
            PKR 1,500<span className="text-sm text-gray-600">/mo</span>
          </p>
          <ul className="space-y-2 mb-4 text-sm text-gray-600">
            <li>• 10 GB Storage</li>
            <li>• Unlimited Bandwidth</li>
            <li>• Free SSL</li>
          </ul>
          <div className="flex gap-2">
            <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
              Edit
            </button>
            <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_Hosting;
