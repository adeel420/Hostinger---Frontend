import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Noto Sans KR, sans-serif" }}>
            About WARU
          </h1>
          <p className="text-xl text-gray-600">Crafting digital experiences with precision</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At WARU, we believe in the power of meticulous design and attention to detail. 
              Every pixel matters, every interaction counts. We don't just build websites—we 
              craft digital experiences that resonate with your audience and bring your vision to life.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the leading creative studio that transforms ideas into stunning digital realities. 
              We strive to push boundaries, embrace innovation, and deliver excellence in every project 
              we undertake.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Creative Excellence</h3>
              <p className="text-gray-600">Innovative designs that stand out</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quality work delivered on time</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Client Focused</h3>
              <p className="text-gray-600">Your vision is our priority</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
