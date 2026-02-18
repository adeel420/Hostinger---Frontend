import React from "react";
import { Search, Edit, Trash2 } from "lucide-react";

const User_Management = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          User Management
        </h2>
        <p className="text-gray-600 text-lg">Manage all registered users</p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 w-80"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-purple-50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">John Doe</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  john@example.com
                </td>
                <td className="px-6 py-4">
                  <span className="px-4 py-1.5 text-xs font-bold text-green-700 bg-green-100 rounded-full">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User_Management;
