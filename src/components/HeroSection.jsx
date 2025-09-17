import React from 'react';
import heroImage from '../assets/chickslanding.jpg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-[#fdfcf9]"> {/* Near-white warm background for contrast */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-[#b58900] leading-tight">
              Welcome to FarmTrack
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-700">
              Revolutionize your farming with smart tracking and management solutions. Monitor crops, livestock, and resources with ease.
            </p>
            <div className="mt-6">
              <Link
                to='/login'
                className="inline-block bg-[#b58900] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#a57800] transition-colors duration-200"
              >
                Get Started
              </Link>
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
