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
      <div className="w-full md:w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white shadow-xl">
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold mb-1">Admin Panel</h1>
          <p className="text-purple-200 text-xs md:text-sm">
            Hosting Management
          </p>
        </div>

        {/* Buttons */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible px-2 md:px-3 space-x-2 md:space-x-0 md:space-y-1 pb-2 md:pb-0">
          {adminDashBtn.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveBtn(btn.id)}
              className={`flex cursor-pointer items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg whitespace-nowrap transition-all ${
                activeBtn === btn.id
                  ? "bg-white text-purple-600 shadow-lg"
                  : "text-white hover:bg-purple-700"
              }`}
            >
              {iconMap[btn.icon]}
              <span className="text-sm md:text-base font-medium">
                {btn.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
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
            <div className="text-center">
              <LogOut className="w-12 md:w-16 h-12 md:h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Logout
              </h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Are you sure you want to logout?
              </p>
              <button
                className="bg-red-600 cursor-pointer text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-red-700 font-semibold"
                onClick={() => navigate("/")}
              >
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
