import React, { useState, useEffect } from "react";
import { Mail, Clock, Reply } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact_Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/contact/all`);
      setMessages(response.data);
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffMs = now - messageDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Contact Messages
        </h2>
        <p className="text-gray-600 text-lg">View customer inquiries</p>
      </div>
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No messages yet</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{msg.name}</h3>
                    <p className="text-sm text-gray-600">{msg.email}</p>
                    <p className="text-sm font-semibold text-purple-600 mt-1">{msg.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">{formatDate(msg.createdAt)}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed bg-gray-50 p-4 rounded-xl">
                {msg.message}
              </p>
              <a
                href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Reply className="w-4 h-4" />
                Reply
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Contact_Messages;
