import { CheckCircle, XCircle } from "lucide-react";
import React from "react";

const Payments = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Verification
        </h2>
        <p className="text-gray-600">Approve or reject payment proofs</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Proof
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">#12345</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  john@example.com
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">JazzCash</td>
                <td className="px-6 py-4 text-sm text-gray-900">PKR 3,500</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline">
                    View Screenshot
                  </button>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                    <XCircle className="w-5 h-5" />
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

export default Payments;
