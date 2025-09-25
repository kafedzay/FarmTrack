import React from 'react';
import aboutImage from '../assets/pic.jpg';
import FooterSection from './FooterSection';


const AboutSection = () => {
  return (
    <div>
      <section className="bg-[#FFF5E1] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" id="about">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b58900] tracking-tight">
            About FarmTrack
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            FarmTrack empowers poultry farmers with innovative tools to streamline operations and boost efficiency. 
            Our platform offers real-time monitoring of flock health, egg production, and feed efficiency, tailored 
            specifically for poultry farming. Whether you're managing a small family farm or a large commercial operation, 
            FarmTrack delivers actionable insights to drive sustainable growth.
          </p>
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Why FarmTrack Stands Out</h3>
            <ul className="text-base sm:text-lg text-gray-700 list-disc list-inside space-y-2">
              <li><strong>Proven Expertise:</strong> Built by a team with 50+ years in agritech, trusted by farmers in 20+ countries.</li>
              <li><strong>Poultry-Focused:</strong> Specialized tools for flock health, egg yield tracking, and feed optimization.</li>
              <li><strong>Real-Time Insights:</strong> Customizable dashboards for data-driven decisions to reduce costs.</li>
              <li><strong>Sustainable Solutions:</strong> Promote efficient resource use and environmentally responsible farming.</li>
              <li><strong>Easy to Use:</strong> Intuitive interface accessible on mobile, tablet, and desktop for all farmers.</li>
            </ul>
          </div>
          <div className="mt-6 flex justify-center lg:justify-start gap-4">
            <a
              href="#learn-more"
              className="inline-block bg-[#b58900] text-white font-semibold px-6 py-3 rounded-lg 
              hover:bg-[#a57800] transition-colors duration-300 text-base sm:text-lg"
            >
              Learn More
            </a>
            <a
              href="#testimonials"
              className="inline-block bg-transparent border-2 border-[#b58900] text-[#b58900] 
              font-semibold px-6 py-3 rounded-lg hover:bg-[#b58900]/10 transition-colors duration-300 text-base sm:text-lg"
            >
              See Testimonials
            </a>
          </div>
        </div>
        {/* Image Section */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src={aboutImage}
            alt="Poultry farm with FarmTrack technology"
            className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[300px] sm:max-h-[400px] lg:max-h-[500px]"
          />
        </div>
      </div>
    </section>
    <FooterSection />
    </div>
  );
};

export default AboutSection;