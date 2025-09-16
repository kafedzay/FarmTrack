import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="bg-[#fdfcf9] py-12 md:py-20" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#b58900]">
            Key Features
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Discover what makes FarmTrack your go-to farm management solution.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#b58900] mb-2">
              Real-Time Monitoring
            </h3>
            <p className="text-gray-700">
              Keep track of crops and livestock with live data analytics.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#b58900] mb-2">
              Data Insights
            </h3>
            <p className="text-gray-700">
              Get actionable insights to optimize your farm productivity.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#b58900] mb-2">
              Easy Integration
            </h3>
            <p className="text-gray-700">
              Integrate easily with your existing tools and workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

