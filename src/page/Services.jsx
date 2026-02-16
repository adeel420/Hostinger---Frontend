import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites built with modern technologies, optimized for performance and user experience.",
      icon: "💻"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that engage users and drive conversions.",
      icon: "🎨"
    },
    {
      title: "Brand Identity",
      description: "Complete brand design including logos, color schemes, and visual guidelines.",
      icon: "✨"
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      icon: "📱"
    },
    {
      title: "E-Commerce",
      description: "Full-featured online stores with secure payment integration and inventory management.",
      icon: "🛒"
    },
    {
      title: "Consulting",
      description: "Strategic guidance on digital transformation and technology implementation.",
      icon: "💡"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Noto Sans KR, sans-serif" }}>
            Our Services
          </h1>
          <p className="text-xl text-gray-600">Comprehensive solutions for your digital needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-purple-100 mb-6">Let's discuss how we can bring your vision to life</p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
