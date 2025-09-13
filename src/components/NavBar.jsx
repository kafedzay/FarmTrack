import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import React Router components
import { Menu, X, Home, Info, Tractor, Star, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home, href: '/' }, // Updated to root route
    { name: 'About', icon: Info, href: '/AboutSection' }, // Matches your provided href
    { name: 'Services', icon: Tractor, href: '/ServicesSection' }, // Updated to route
    { name: 'Features', icon: Star, href: '/features' }, // Updated to route
    { name: 'Contact', icon: Phone, href: '/contact' }, // Updated to route
  ];

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              FarmTrack
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 hover:text-green-200 transition-colors duration-200 ${
                    isActive ? 'text-green-200 border-b-2 border-green-200' : ''
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-green-200 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-800">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-green-200 transition-colors duration-200 ${
                    isActive ? 'bg-green-700 text-green-200' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;