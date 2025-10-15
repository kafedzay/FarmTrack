import heroimg1 from '../assets/Heroimg1.png';
import { Link } from 'react-router-dom';
import heroimg2 from '../assets/Heroimg2.jpg';
import heroimg3 from '../assets/Heroimg3.jpg';
import FooterSection from './FooterSection';
import Navbar from './NavBar';

const HeroSection = () => {
  return (
    <div>
      <Navbar />
      {/* Existing Hero Section Content - DO NOT CHANGE */}
      <section className="bg-white mt-20 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-700 tracking-tight">
              The perfect software for your poultry business
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Transform your poultry farming with FarmTrack's smart tracking and management solutions.
              Effortlessly monitor your flock's health, egg production, feed consumption, and farm resources
              in real-time with our intuitive tools designed specifically for poultry farmers.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Link
                to="/login"
                className="inline-block bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg
              hover:bg-yellow-600 transition-colors duration-300 text-base sm:text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/features"
                className="inline-block bg-transparent border-2 border-yellow-500 text-yellow-700
              font-semibold px-6 py-3 rounded-lg hover:bg-yellow-50 transition-colors duration-300 text-base sm:text-lg"
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
              src={heroimg1}
              alt="Poultry farm with smart tracking technology"
              className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[300px] sm:max-h-[300px] lg:max-h-[450px]"
            />
            <div className="mt-4 flex justify-center gap-4">
              <img
                src={heroimg2}
                alt="Healthy chickens in farm"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md object-cover"
              />
              <img
                src={heroimg3}
                alt="FarmTrack dashboard preview"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Key Features Overview Section --- */}
      <section className="bg-[#FFF5E1] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Features Designed to Boost Your Profit 📈
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature Card 1: Health & Mortality Tracking */}
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <div className="text-yellow-500 text-3xl mb-4">🩺</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flock Health Management</h3>
              <p className="text-gray-600">
                Track **daily mortality and disease events** effortlessly. Get timely alerts and detailed reports to minimize losses and ensure early intervention, keeping your flock in optimal condition.
              </p>
            </div>
            {/* Feature Card 2: Financial Reporting */}
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <div className="text-yellow-500 text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Financial Analytics</h3>
              <p className="text-gray-600">
                Monitor **income and expenses** directly related to your farm. Visualize your profitability with intuitive charts, helping you make data-driven decisions on where to invest or cut costs.
              </p>
            </div>
            {/* Feature Card 3: Inventory Management */}
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <div className="text-yellow-500 text-3xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Feed & Resource Control</h3>
              <p className="text-gray-600">
                Keep a real-time count of your **feed, medication, and supply inventory**. Set automated reminders for low stock to avoid costly delays and ensure continuous operation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials/Social Proof Section --- */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Trusted by Farmers Worldwide 🌍
          </h2>
          <div className="space-y-8">
            <blockquote className="bg-yellow-50 p-6 rounded-lg shadow-inner border-l-4 border-yellow-500">
              <p className="text-lg italic text-gray-700">
                "Since implementing FarmTrack, our egg production analysis has become effortless. We've reduced feed waste by 15% in the first quarter alone! It's an indispensable tool."
              </p>
              <footer className="mt-4">
                <p className="font-semibold text-yellow-700">— Kwame A., Large-Scale Layer Farm Owner</p>
              </footer>
            </blockquote>
            <blockquote className="bg-yellow-50 p-6 rounded-lg shadow-inner border-l-4 border-yellow-500">
              <p className="text-lg italic text-gray-700">
                "The health tracking alerts have been a lifesaver. We catch issues so much faster now. FarmTrack truly scales with our small broiler operation."
              </p>
              <footer className="mt-4">
                <p className="font-semibold text-yellow-700">— Sarah M., Family Poultry Business</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* --- NEW BLOG SECTION ADDED HERE --- */}
      <section className="bg-[#FFF5E1] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Stay Informed 📰
            </h2>
            <Link
              to="/blogs"
              className="text-yellow-700 font-semibold hover:text-yellow-900 transition-colors duration-300"
            >
              Learn more &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-sm font-medium text-yellow-500 mb-2">Farm Management</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-yellow-700 transition-colors">
                  <Link to="/blogs/blog-1-slug">
                    5 Ways to Reduce Feed Waste on Your Poultry Farm
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">
                  Discover practical tips and software features that can cut down on your biggest expense and increase profitability immediately.
                </p>
                <p className="text-xs text-gray-400 mt-4">October 10, 2025</p>
              </div>
            </div>
            {/* Blog Post 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-sm font-medium text-yellow-500 mb-2">Health & Wellness</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-yellow-700 transition-colors">
                  <Link to="/blogs/blog-2-slug">
                    Early Warning Signs: Identifying Avian Flu in Your Flock
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn how FarmTrack's monitoring tools help you detect subtle changes in behavior and health metrics before it's too late.
                </p>
                <p className="text-xs text-gray-400 mt-4">September 28, 2025</p>
              </div>
            </div>
            {/* Blog Post 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-sm font-medium text-yellow-500 mb-2">Technology</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-yellow-700 transition-colors">
                  <Link to="/blogs/blog-3-slug">
                    The Future of Farming: IoT Sensors and Poultry
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">
                  An in-depth look at the technology powering FarmTrack and how smart sensors are changing the poultry industry for the better.
                </p>
                <p className="text-xs text-gray-400 mt-4">September 15, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- END NEW BLOG SECTION --- */}

      {/* --- Call to Action (CTA) Section --- */}
      <section className="bg-yellow-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Revolutionize Your Farm?
          </h2>
          <p className="text-xl text-yellow-100 mb-8">
            Join thousands of successful poultry farmers who are increasing efficiency and boosting profits with FarmTrack.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-yellow-700 font-bold px-10 py-4 rounded-full
            shadow-lg hover:bg-gray-100 transition-colors duration-300 text-lg sm:text-xl transform hover:scale-105"
          >
            Start Your Free Trial Today!
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default HeroSection;