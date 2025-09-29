import heroImage from '../assets/chickslanding.jpg';
import { Link } from 'react-router-dom';
import pic from '../assets/pic.jpg';
import FooterSection from './FooterSection';
import Navbar from './NavBar';

const HeroSection = () => {
  return (
    <div>
       <Navbar />
      <section className="bg-[#FFF5E1] mt-20 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 tracking-tight">
            Welcome to FarmTrack
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Transform your poultry farming with FarmTrack's smart tracking and management solutions. 
            Effortlessly monitor your flock's health, egg production, feed consumption, and farm resources 
            in real-time with our intuitive tools designed specifically for poultry farmers.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg 
              hover:bg-blue-700 transition-colors duration-300 text-base sm:text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="inline-block bg-transparent border-2 border-blue-600 text-blue-600 
              font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 text-base sm:text-lg"
            >
              Explore Features
            </Link>
          </div>
          <div className="mt-6 text-gray-600 text-sm sm:text-base">
            <p>Why FarmTrack?</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Real-time monitoring of poultry health and growth metrics</li>
              <li>Automated egg production tracking and analytics</li>
              <li>Optimize feed schedules and reduce waste</li>
              <li>Scalable solutions for small and large poultry farms</li>
            </ul>
          </div>
        </div>
        {/* Image */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src={heroImage}
            alt="Poultry farm with smart tracking technology"
            className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[400px] sm:max-h-[500px] lg:max-h-[600px]"
          />
          <div className="mt-4 flex justify-center gap-4">
            <img
              src={pic}
              alt="Healthy chickens in farm"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md object-cover"
            />
            <img
              src={heroImage}
              alt="FarmTrack dashboard preview"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
    <FooterSection />
    </div>
  );
};

export default HeroSection;