import React, { useState } from "react";
import { adminDashBtn } from "../data/Data";
import {
  Users,
  Globe,
  Edit,
  Server,
  Settings,
  ShoppingCart,
  CreditCard,
  Mail,
  LogOut,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import User_Management from "../components/admin_subsections/User_Management";

const Admin_Dashboard = () => {
  const [activeBtn, setActiveBtn] = useState(0);

  const iconMap = {
    Users: <Users className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    Edit: <Edit className="w-5 h-5" />,
    Server: <Server className="w-5 h-5" />,
    Settings: <Settings className="w-5 h-5" />,
    ShoppingCart: <ShoppingCart className="w-5 h-5" />,
    CreditCard: <CreditCard className="w-5 h-5" />,
    Mail: <Mail className="w-5 h-5" />,
    LogOut: <LogOut className="w-5 h-5" />,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
          <p className="text-purple-200 text-sm">Hosting Management</p>
        </div>
        <div className="flex flex-col px-3 space-y-1">
          {adminDashBtn.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveBtn(btn.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeBtn === btn.id
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white hover:bg-purple-700"
              }`}
            >
              {iconMap[btn.icon]}
              <span className="font-medium">{btn.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* User Management */}
        {activeBtn === 0 && <User_Management />}

        {/* Create Domain */}
        {activeBtn === 1 && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Domain
              </h2>
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
        )}

        {/* Update Domain */}
        {activeBtn === 2 && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Update Domain
              </h2>
              <p className="text-gray-600">Manage existing domains</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Domain
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Extension
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        example
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">.com</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        PKR 2,500
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-purple-600 hover:text-purple-800 mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Create Hosting */}
        {activeBtn === 3 && (
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
        )}

        {/* Update Hosting */}
        {activeBtn === 4 && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Update Hosting Plans
              </h2>
              <p className="text-gray-600">Manage existing hosting plans</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Starter
                </h3>
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
        )}

        {/* Orders */}
        {activeBtn === 5 && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Orders</h2>
              <p className="text-gray-600">Manage customer orders</p>
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
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        #12345
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        john@example.com
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        Professional
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        PKR 3,500
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-purple-600 hover:text-purple-800 mr-3">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Payments */}
        {activeBtn === 6 && (
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
                      <td className="px-6 py-4 text-sm text-gray-900">
                        #12345
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        john@example.com
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        JazzCash
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        PKR 3,500
                      </td>
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
        )}

        {/* Contact Messages */}
        {activeBtn === 7 && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Contact Messages
              </h2>
              <p className="text-gray-600">View customer inquiries</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">John Doe</h3>
                    <p className="text-sm text-gray-600">john@example.com</p>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-gray-700 mb-3">
                  I need help with my hosting setup. Can you assist?
                </p>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-semibold">
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        {activeBtn === 8 && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <LogOut className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Logout</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout?
              </p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 font-semibold">
                Confirm Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_Dashboard;
