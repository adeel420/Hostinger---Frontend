import React from "react";
import { Link } from "react-router-dom";
import { Code, Palette, Smartphone, ShoppingCart, TrendingUp, Lightbulb } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Shared Hosting",
      description: "Perfect for beginners and small websites. Get started with affordable, reliable hosting.",
      icon: <Code className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "WordPress Hosting",
      description: "Optimized hosting for WordPress sites with automatic updates and enhanced security.",
      icon: <Palette className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "VPS Hosting",
      description: "Dedicated resources and full control for growing websites and applications.",
      icon: <Smartphone className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Dedicated Servers",
      description: "Maximum performance with complete server control for enterprise applications.",
      icon: <ShoppingCart className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Domain Registration",
      description: "Register your perfect domain name with competitive pricing and free WHOIS privacy.",
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "24/7 Support",
      description: "Expert technical support available round the clock to help you succeed.",
      icon: <Lightbulb className="w-8 h-8" />,
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl mx-4 md:mx-8 mb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-24 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            Our
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Comprehensive hosting solutions for every need
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl mb-6 text-white group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative px-8 py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose the perfect hosting plan for your website today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/hosting"
                className="inline-block px-10 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-2xl"
              >
                View Hosting Plans
              </Link>
              <Link
                to="/contact"
                className="inline-block px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
