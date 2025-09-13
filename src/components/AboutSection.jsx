import React from 'react';
import aboutImage from '../assets/ccoup.jpg';

const AboutSection = () => {
  return (
    <section className="bg-white py-12 md:py-20" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Image */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={aboutImage}
              alt="About FarmTrack"
              className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[400px] md:max-h-[500px]"
            />
          </div>

          {/* Text Content */}
          <div className="md:w-1/2 md:pl-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              About FarmTrack
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              FarmTrack is dedicated to empowering farmers with innovative tools to streamline operations and boost productivity. Our mission is to provide cutting-edge solutions for crop monitoring, livestock management, and resource optimization.
            </p>
            <p className="text-lg text-gray-600">
              Founded by a team passionate about agriculture and technology, we combine expertise to help farmers thrive in a sustainable future. Join us in revolutionizing modern farming.
            </p>
            <div className="mt-6">
              <a
                href="#learn-more"
                className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;