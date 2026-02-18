import { Eye } from "lucide-react";
import React from "react";

const Orders = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Orders</h2>
        <p className="text-gray-600 text-lg">Manage customer orders</p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Amount
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
                <td className="px-6 py-4 text-sm font-bold text-gray-900">#12345</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  john@example.com
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  Professional
                </td>
                <td className="px-6 py-4 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">PKR 3,500</td>
                <td className="px-6 py-4">
                  <span className="px-4 py-1.5 text-xs font-bold text-yellow-700 bg-yellow-100 rounded-full">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                    <Eye className="w-4 h-4" />
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

export default Orders;
