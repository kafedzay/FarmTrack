import React from 'react';

const ServicesSection = () => {
  return (
    <section className="bg-green-50 py-12 md:py-20" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              FarmTrack offers a suite of tools to optimize your farming operations:
            </p>
            <ul className="text-lg text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">🌾</span> Crop Monitoring & Analytics
              </li>
              <li className="flex items-center">
                <span className="mr-2">🐄</span> Livestock Management
              </li>
              <li className="flex items-center">
                <span className="mr-2">💧</span> Resource Optimization
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="#get-started"
                className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 md:pl-10">
            <img
              src="/assets/services-image.jpg"
              alt="FarmTrack Services"
              className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[400px] md:max-h-[500px]"
              onError={(e) => (e.target.src = '/assets/fallback-image.jpg')} // Fallback image
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;