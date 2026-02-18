import React from "react";
import { Award, Users, Target, Zap, Shield, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl mx-4 md:mx-8 mb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-24 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            About
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              HostPro
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Empowering businesses with reliable hosting solutions since 2020
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="group bg-white rounded-3xl shadow-xl p-10 border-2 border-gray-100 hover:border-purple-300 transition-all hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To provide world-class hosting services that empower businesses to thrive online. 
              We believe in delivering exceptional performance, security, and support that exceeds expectations.
            </p>
          </div>

          <div className="group bg-white rounded-3xl shadow-xl p-10 border-2 border-gray-100 hover:border-purple-300 transition-all hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To be the most trusted hosting provider globally, known for innovation, reliability, 
              and customer-first approach. We strive to make web hosting accessible and affordable for everyone.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-3xl p-12 mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">10K+</div>
              <div className="text-purple-300 font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">99.9%</div>
              <div className="text-purple-300 font-medium">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">24/7</div>
              <div className="text-purple-300 font-medium">Expert Support</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">4+ Years</div>
              <div className="text-purple-300 font-medium">In Business</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to your success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
            <p className="text-gray-600 leading-relaxed">
              Bank-level security with SSL certificates, DDoS protection, and daily backups
            </p>
          </div>

          <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">
              SSD storage and optimized servers ensure your website loads in milliseconds
            </p>
          </div>

          <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Customer First</h3>
            <p className="text-gray-600 leading-relaxed">
              24/7 expert support team ready to help you succeed at every step
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
