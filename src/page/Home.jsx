import React, { useState } from "react";
import {
  Search,
  Server,
  Shield,
  Zap,
  Clock,
  HeadphonesIcon,
  CheckCircle,
  Globe,
} from "lucide-react";
import { banksLogo } from "../data/Data";

const Home = () => {
  const [domain, setDomain] = useState("");

  const plans = [
    {
      name: "Starter",
      price: "1,500",
      period: "/month",
      features: [
        "1 Website",
        "10 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "1 Email Account",
        "24/7 Support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "3,500",
      period: "/month",
      features: [
        "5 Websites",
        "50 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "10 Email Accounts",
        "Free Domain (1 Year)",
        "24/7 Priority Support",
      ],
      popular: true,
    },
    {
      name: "Business",
      price: "6,500",
      period: "/month",
      features: [
        "Unlimited Websites",
        "100 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Unlimited Email Accounts",
        "Free Domain (1 Year)",
        "Daily Backups",
        "24/7 Premium Support",
      ],
      popular: false,
    },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "99.9% uptime guarantee with blazing fast servers",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Safe",
      description: "Free SSL certificates and daily security scans",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Expert support team available round the clock",
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Easy Management",
      description: "User-friendly cPanel for complete control",
    },
  ];

  const handleDomainSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", domain);
  };

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium Web Hosting
            <span className="text-purple-600"> Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Fast, secure, and reliable hosting solutions for your website. Get
            started today with our affordable plans.
          </p>

          {/* Domain Search */}
          <form
            onSubmit={handleDomainSearch}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-lg shadow-lg">
              <div className="flex-1 flex items-center px-4 border-2 border-gray-200 rounded-lg focus-within:border-purple-500">
                <Globe className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search your perfect domain name..."
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="flex-1 py-3 outline-none text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              .com PKR 2,500/year
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              .pk PKR 1,800/year
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              .net PKR 2,800/year
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-gray-600">
              Affordable hosting plans with powerful features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 ${
                  plan.popular ? "ring-4 ring-purple-500 relative" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-purple-600 text-white text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-purple-600">
                      PKR {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Easy Payment Methods
            </h2>
            <p className="text-xl text-gray-600">
              Pay securely with your preferred method
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {banksLogo.map((bank) => (
              <div
                key={bank.id}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-100"
              >
                <div className="flex items-center justify-center h-32">
                  <img
                    src={bank.icon}
                    alt="Payment Method"
                    className="max-h-24 max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 max-w-2xl mx-auto">
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
              <p className="text-gray-700 font-medium mb-2">
                📸 Upload payment proof and get instant activation after admin approval
              </p>
              <p className="text-sm text-gray-600">
                Supported: JazzCash, Easypaisa, Bank Transfer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and launch your website today
            with our reliable hosting services.
          </p>
          <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
            Start Your Journey Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
