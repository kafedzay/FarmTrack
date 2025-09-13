import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Real-Time Tracking',
      description: 'Monitor your farm’s activities in real time with our advanced dashboard.',
    },
    {
      title: 'Data Analytics',
      description: 'Gain insights with powerful analytics to make informed decisions.',
    },
    {
      title: 'Mobile Access',
      description: 'Manage your farm from anywhere with our mobile app.',
    },
  ];

  return (
    <section className="bg-white py-12 md:py-20" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-600">
            Discover the powerful tools that make FarmTrack the ultimate farming solution.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Feature Cards */}
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 md:mb-0">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-green-100 p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="md:w-1/2 md:pl-10">
            <img
              src="/assets/features-image.jpg"
              alt="FarmTrack Features"
              className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[400px] md:max-h-[500px]"
              onError={(e) => (e.target.src = '/assets/fallback-image.jpg')} // Fallback image
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;