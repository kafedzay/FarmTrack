import React from 'react';
import FooterSection from './FooterSection';

const FeaturesSection = () => {
  return (
   <div>
     <section className="bg-[#FFF5E1] py-12 sm:py-16 md:py-20 lg:py-24" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b58900] tracking-tight">
            Key Features of FarmTrack
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Unlock the full potential of your poultry farm with FarmTrack's advanced, poultry-focused tools. Our platform delivers real-time insights, streamlines operations, and promotes sustainable practices to boost productivity, reduce costs, and ensure flock well-being.
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Feature 1: Flock Health Monitoring */}
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.pinimg.com/1200x/c4/c0/e2/c4c0e28f666742935e24d359e974c542.jpg"
              alt="Flock Health Monitoring"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 object-cover rounded-full"
            />
            <h3 className="text-xl font-semibold text-[#b58900] mb-3 text-center">
              Flock Health Monitoring
            </h3>
            <p className="text-gray-700 text-base text-center">
              Ensure your flock thrives with real-time health monitoring. Our advanced sensors track vital signs like temperature, heart rate, and activity levels, alerting you to early signs of illness or stress. Customize alerts for diseases like avian flu, monitor flock behavior, and maintain optimal coop conditions to reduce mortality rates by up to 20% and improve growth efficiency.
            </p>
          </div>
          {/* Feature 2: Egg Production Tracking */}
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.pinimg.com/1200x/84/55/bf/8455bf87903b6286735bbc7273448b55.jpg"
              alt="Egg Production Tracking"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 object-cover rounded-full"
            />
            <h3 className="text-xl font-semibold text-[#b58900] mb-3 text-center">
              Egg Production Tracking
            </h3>
            <p className="text-gray-700 text-base text-center">
              Maximize egg yields with automated tracking and analytics. Monitor daily egg counts, identify peak laying periods, and detect anomalies in production. Our system integrates with smart nesting boxes to provide precise data, helping you optimize hen performance, forecast output, and increase profitability by up to 15% through data-driven breeding and management strategies.
            </p>
          </div>
          {/* Feature 3: Feed Optimization */}
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.pinimg.com/736x/d7/b2/c1/d7b2c1125f17f4732238112ebb2716eb.jpg"
              alt="Feed Optimization"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 object-cover rounded-full"
            />
            <h3 className="text-xl font-semibold text-[#b58900] mb-3 text-center">
              Feed Optimization
            </h3>
            <p className="text-gray-700 text-base text-center">
              Reduce feed costs and waste with precision feeding insights. Track consumption patterns, adjust rations based on flock needs, and monitor feed conversion ratios (FCR). Our AI-driven recommendations help you balance nutrition, minimize overfeeding, and cut feed expenses by up to 25%, all while supporting healthy weight gain and egg quality.
            </p>
          </div>
          {/* Feature 4: Advanced Analytics */}
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://i.pinimg.com/1200x/be/83/fd/be83fdc16713b3b4fb94f8767b277af9.jpg"
              alt="Advanced Analytics"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 object-cover rounded-full"
            />
            <h3 className="text-xl font-semibold text-[#b58900] mb-3 text-center">
              Advanced Analytics
            </h3>
            <p className="text-gray-700 text-base text-center">
              Transform data into actionable insights with customizable dashboards. Analyze flock performance metrics, predict production trends, and monitor farm efficiency in real-time. Generate detailed reports on health, yield, and costs, enabling informed decisions that enhance sustainability and profitability. Our analytics are trusted by farmers in over 20 countries.
            </p>
          </div>
        </div>
        {/* Additional Information */}
        <div className="mt-12 text-center space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#b58900]">
              Why Poultry Farmers Trust FarmTrack
            </h3>
            <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto">
              FarmTrack is designed with poultry farmers in mind, offering scalable solutions for farms of all sizes. Our platform integrates seamlessly with existing systems, supports multi-device access (mobile, tablet, desktop), and provides 24/7 data security with cloud-based backups. With a user-friendly interface and dedicated support, FarmTrack empowers farmers to focus on what matters most—growing their business sustainably.
            </p>
          </div>
          <a
            href="#get-started"
            className="inline-block bg-[#b58900] text-white font-semibold px-6 py-3 rounded-lg 
            hover:bg-[#a57800] transition-colors duration-300 text-base sm:text-lg"
          >
            Start Using FarmTrack Today
          </a>
        </div>
      </div>
    </section>
    <FooterSection/>
   </div>
  );
};

export default FeaturesSection;