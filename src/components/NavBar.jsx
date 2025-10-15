
import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const baseItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/AboutSection" },
    { name: "Features", href: "/features" },
    { name: "Blogs", href: "/Blogs" },
    { name: "Contact Us", href: "/contact" },
  ];
  const authItem =
    user && location.pathname === "/"
      ? { name: "Dashboard", icon: User, href: "/AdminPage/dashboard" }
      : { name: "Login/Register", icon: User, href: "/login" };
  const navItems = [...baseItems, authItem];

  return (
    <nav className="bg-white text-[#d4a017] shadow-2xl fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo as Home Button */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`text-3xl lg:text-4xl font-extrabold tracking-tight transition-all duration-300 ease-in-out transform hover:scale-120 ${location.pathname === "/"
                  ? "text-[#d4a017] "
                  : "hover:text-[#b58900]"
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
                  `flex items-center space-x-4 text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-120 hover:text-[#b58900] group ${isActive
                    ? "text-[#d4a017] border-b-4 border-[#d4a017]"
                    : ""
                  }`
                }
                aria-label={item.name}
              >
                {item.icon ? (
                  <item.icon className="w-7 h-7 group-hover:animate-pulse" />
                ) : null}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg hover:text-[#b58900] focus:outline-none focus:ring-2 focus:ring-[#d4a017] transition-all duration-300"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-3 pt-3 pb-5 space-y-2 sm:px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#fffbe6] hover:text-[#b58900] ${isActive ? "bg-[#fffbe6] text-[#d4a017] shadow-md" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
                aria-label={item.name}
              >
                {item.icon ? (
                  <item.icon className="w-7 h-7" />
                ) : null}
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
