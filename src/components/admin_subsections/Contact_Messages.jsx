import React from "react";

const Contact_Messages = () => {
  return (
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
  );
};

export default Contact_Messages;
