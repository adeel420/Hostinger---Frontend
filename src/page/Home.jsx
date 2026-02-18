import React, { useState } from "react";
import {
  Search,
  Server,
  Shield,
  Zap,
  Rocket,
  HeadphonesIcon,
  CheckCircle,
  Globe,
  Star,
  TrendingUp,
  Award,
  Lock,
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
      color: "from-blue-500 to-cyan-500",
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
      color: "from-purple-500 to-pink-500",
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
      color: "from-orange-500 to-red-500",
    },
  ];

  const features = [
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "Blazing Speed",
      description: "Lightning-fast SSD servers with 99.9% uptime",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Lock className="w-10 h-10" />,
      title: "Bank-Level Security",
      description: "Free SSL, DDoS protection & daily backups",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Expert Support",
      description: "24/7 dedicated support team at your service",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Scalable Solutions",
      description: "Grow your business without limitations",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const handleDomainSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", domain);
  };

  return (
    <div className="min-h-screen mt-20 bg-white">
      {/* Hero Section - Unique Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-medium">Trusted by 10,000+ Customers</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Your Website,
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Our Passion
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              Premium hosting solutions designed for speed, security, and success
            </p>

            {/* Domain Search - Modern Style */}
            <form onSubmit={handleDomainSearch} className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center px-6 py-4 bg-gray-50 rounded-xl">
                  <Globe className="w-6 h-6 text-purple-600 mr-3" />
                  <input
                    type="text"
                    placeholder="Find your perfect domain..."
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-800 text-lg font-medium placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search Now
                </button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-6 mt-8 text-white">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="font-medium">.com - PKR 2,500/yr</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="font-medium">.pk - PKR 1,800/yr</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="font-medium">.net - PKR 2,800/yr</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Card Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why We're Different
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience hosting that goes beyond expectations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 text-white group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans - Modern Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? "border-purple-500 shadow-2xl" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm">
                    ⭐ POPULAR
                  </div>
                )}
                
                <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-2 text-lg">PKR{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} text-white hover:opacity-90`
                        : "bg-gray-900 text-white hover:bg-gray-800"
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

      {/* Payment Methods - Minimal Design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Flexible Payment Options
            </h2>
            <p className="text-xl text-gray-600">
              Pay your way with trusted local methods
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {banksLogo.map((bank) => (
              <div
                key={bank.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex items-center justify-center h-24">
                  <img
                    src={bank.icon}
                    alt="Payment Method"
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white p-3 rounded-xl">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Secure Payment Process
                </h3>
                <p className="text-gray-700">
                  Upload payment proof → Admin verification → Instant activation
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Supported: JazzCash • Easypaisa • Bank Transfer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold Design */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Launch?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of successful websites powered by our hosting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-3xl">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-xl font-bold text-lg transition-all">
              View All Plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
