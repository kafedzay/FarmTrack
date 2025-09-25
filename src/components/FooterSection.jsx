import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className="bg-[#b58900] text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Company Description */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              FarmTrack
            </h2>
            <p className="text-sm sm:text-base text-gray-200 max-w-xs">
              FarmTrack empowers poultry farmers with cutting-edge tools for real-time flock monitoring, egg production tracking, and sustainable farm management. Join thousands of farmers worldwide in revolutionizing poultry farming.
            </p>
          </div>
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-200">
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white transition-colors duration-300">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          {/* Social Media & Support */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Connect with Us
            </h3>
            <div className="space-y-2 text-sm sm:text-base text-gray-200">
              <p>
                <a href="https://x.com/farmtrack" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                  X Platform
                </a>
              </p>
              <p>
                <a href="https://linkedin.com/company/farmtrack" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                  LinkedIn
                </a>
              </p>
              <p>
                <a href="mailto:support@farmtrack.com" className="hover:text-white transition-colors duration-300">
                  support@farmtrack.com
                </a>
              </p>
            </div>
            <div className="pt-4">
              <Link
                to="/signup"
                className="inline-block bg-white text-[#b58900] font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-300/30 text-center text-sm sm:text-base text-gray-200">
          <p>&copy; {new Date().getFullYear()} FarmTrack. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;