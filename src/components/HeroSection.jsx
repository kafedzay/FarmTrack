// components/HeroSection.jsx
import React from 'react';
import heroImage from '../assets/chickslanding.jpg';

const HeroSection = () => {
  return (
    <section className="bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 leading-tight">
              Welcome to FarmTrack
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              Revolutionize your farming with smart tracking and management solutions. Monitor crops, livestock, and resources with ease.
            </p>
            <div className="mt-6">
              <a
                href="#get-started"
                className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={heroImage}
              alt="FarmTrack Hero"
              className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[400px] md:max-h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;