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
    { 
      name: 'Login/Register', 
      icon: User, 
      href: '/login',
      asButton: true // flag for special styling
    }, 
  ];

  return (
    <nav className="bg-gradient-to-r from-[#b58900] to-[#d4a017] text-white shadow-2xl fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 hover:text-yellow-100 transition-colors duration-200 ${
                    isActive ? 'text-yellow-100 border-b-2 border-yellow-100' : ''
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#a57800]">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-[#b58900] hover:text-yellow-100 transition-colors duration-200 ${
                    isActive ? 'bg-[#b58900] text-yellow-100' : ''
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