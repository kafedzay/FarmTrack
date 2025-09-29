import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'; 
import { Menu, X, Info, Star, Phone, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'About', icon: Info, href: '/AboutSection' },
    { name: 'Features', icon: Star, href: '/features' },
    { name: 'Blogs', icon: Info, href: '/Blogs' },
    { name: 'Contact Us', icon: Phone, href: '/contact' },
    { name: 'Login/Register', icon: User, href: '/login' }, 
  ];

  return (
    <nav className="bg-gradient-to-r from-[#b58900] to-[#d4a017] text-white shadow-2xl fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo as Home Button */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className={`text-3xl lg:text-4xl font-extrabold tracking-tight transition-all duration-300 ease-in-out transform hover:scale-105 ${
                location.pathname === '/' 
                  ? 'text-yellow-100 border-b-4  border-yellow-100' 
                  : 'hover:text-yellow-100'
              }`}
              aria-label="FarmTrack Home"
            >
              FarmTrack
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-3 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-100 group ${
                    isActive ? 'text-yellow-100 border-b-4  border-yellow-100' : ''
                  }`
                }
                aria-label={item.name}
              >
                <item.icon className="w-6 h-6 group-hover:animate-pulse" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-lg hover:text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-100 transition-all duration-300"
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#a57800] to-[#b58900] shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-3 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-4 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#d4a017] hover:text-yellow-100 ${
                    isActive ? 'bg-[#d4a017] text-yellow-100 shadow-md' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
                aria-label={item.name}
              >
                <item.icon className="w-7 h-7" />
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