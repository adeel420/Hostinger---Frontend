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
} from "lucide-react";
import User_Management from "../components/admin_subsections/User_Management";
import { useNavigate } from "react-router-dom";
import Create_Domain from "../components/admin_subsections/Create_Domain";
import Update_Domain from "../components/admin_subsections/Update_Domain";
import Create_Hosting from "../components/admin_subsections/Create_Hosting";
import Update_Hosting from "../components/admin_subsections/Update_Hosting";
import Orders from "../components/admin_subsections/Orders";
import Payments from "../components/admin_subsections/Payments";
import Contact_Messages from "../components/admin_subsections/Contact_Messages";

const Admin_Dashboard = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const navigate = useNavigate();

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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              <p className="text-white/80 text-sm">
                Hosting Management
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible px-3 space-x-2 md:space-x-0 md:space-y-2 pb-2 md:pb-0">
          {adminDashBtn.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveBtn(btn.id)}
              className={`flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                activeBtn === btn.id
                  ? "bg-white text-purple-600 shadow-xl scale-105"
                  : "text-white hover:bg-white/10 backdrop-blur-sm"
              }`}
            >
              {iconMap[btn.icon]}
              <span className="text-sm font-semibold">
                {btn.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-white">
        {activeBtn === 0 && <User_Management />}
        {activeBtn === 1 && <Create_Domain />}
        {activeBtn === 2 && <Update_Domain />}
        {activeBtn === 3 && <Create_Hosting />}
        {activeBtn === 4 && <Update_Hosting />}
        {activeBtn === 5 && <Orders />}
        {activeBtn === 6 && <Payments />}
        {activeBtn === 7 && <Contact_Messages />}

        {activeBtn === 8 && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl mb-6">
                <LogOut className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Logout
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Are you sure you want to logout?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  className="bg-gradient-to-r from-red-600 to-pink-600 cursor-pointer text-white px-8 py-3 rounded-xl hover:from-red-700 hover:to-pink-700 font-bold shadow-lg hover:shadow-xl transition-all"
                  onClick={() => navigate("/")}
                >
                  Confirm Logout
                </button>
                <button
                  className="bg-gray-100 cursor-pointer text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 font-bold transition-all"
                  onClick={() => setActiveBtn(0)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_Dashboard;
