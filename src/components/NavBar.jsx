import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'; 
import { Menu, X, Info, Star, Phone, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'About', icon: Info, href: '/AboutSection' },
    { name: 'Features', icon: Star, href: '/features' },
    { name: 'Blogs',icon: Info, href: '/Blogs' },
    { name: 'Contact Us', icon: Phone, href: '/contact' },
    { name: 'Login/Register', icon: User, href: '/login' }, 
  ];

  return (
    <nav className="bg-[#b58900] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo as Home Button */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className={`text-2xl font-bold tracking-tight transition-colors duration-200 ${
                location.pathname === '/' 
                  ? 'text-yellow-100 border-b-2 border-yellow-100' 
                  : 'hover:text-yellow-100'
              }`}
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
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-yellow-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
