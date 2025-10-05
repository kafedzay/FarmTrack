import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { GrClose, GrMoney } from "react-icons/gr";
import { PiMoneyWavyBold } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pages = [
    {
      path: "/AdminPage/dashboard",
      icon: <RiDashboardFill className="text-xl" />,
      label: "Dashboard",
    },
    {
      path: "/AdminPage/farm",
      icon: <FaHome className="text-xl" />,
      label: "Farms",
    },
    {
      path: "/AdminPage/icometracking",
      icon: <GrMoney className="text-xl" />,
      label: "Income Tracking",
    },
    {
      path: "/AdminPage/operationTracking",
      icon: <FaChartBar className="text-xl" />,
      label: "Operation Tracking",
    },
    {
      path: "/AdminPage/expense",
      icon: <PiMoneyWavyBold className="text-xl" />,
      label: "Expense Tracker",
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsCollapsed(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    closeMobileMenu();
  };

  return (
    <>
      {/* Mobile Navbar: Changed to use a dark background for better contrast with the white sidebar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 text-white h-14 flex items-center justify-between px-4 z-50 shadow-md">
        <button
          className="p-2 rounded-md hover:bg-gray-700 transition-all duration-200 ease-in-out"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <GrClose className="text-white text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
        <span className="text-xl font-semibold tracking-tight">FarmTrack</span>
      </div>

      {/* Sidebar: Changed to white background (bg-white) and dark text (text-gray-800) */}
      <div
        className={`bg-white text-gray-800 shadow-xl transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-64"} 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 fixed md:static z-40 top-14 md:top-0 h-[calc(100vh-3.5rem)] md:h-screen flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          {/* Logo/Title: Used yellowish color for the title */}
          {!isCollapsed && (
            <h1 className="text-2xl font-semibold tracking-tight text-[#b58900]">FarmTrack</h1>
          )}
          {/* Toggle Button: Used yellowish color for the icon/hover */}
          <button
            className="p-2 hidden md:block rounded-md text-gray-500 hover:text-white hover:bg-[#b58900]/90 transition-all duration-200"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <FaBars className="text-xl" />
            ) : (
              <FaArrowLeft className="text-xl" />
            )}
          </button>
        </div>
        <nav className="mt-4 space-y-1 flex-grow">
          {pages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              className={({ isActive }) =>
                // Link Style: Default text is dark, icon is yellowish. Hover/Active background is yellowish, text is white.
                `flex items-center p-3 mx-2 rounded-md text-base font-medium transition-all duration-200 ease-in-out hover:bg-[#a57800]/90 hover:text-white 
                ${isActive ? "bg-[#b58900] text-white shadow-md" : "text-gray-700"}
                `
              }
              onClick={closeMobileMenu}
              aria-label={page.label}
            >
              {/* Icon Color: Used yellowish color for icons when not active, white when active */}
              <span className={`text-xl ${({ isActive }) => isActive ? 'text-white' : 'text-[#b58900]'}`}>
                  {page.icon}
              </span>
              {!isCollapsed && <span className="ml-4">{page.label}</span>}
            </NavLink>
          ))}
        </nav>
        {/* Logout Button */}
        <div className="p-4 mt-auto border-t border-gray-100">
          <h1 className="font-semibold text-sm mb-2 text-gray-600">Welcome {user?.email} 👋</h1>
          <button
            className="flex items-center p-3 mx-2 rounded-md text-base font-medium transition-all duration-200 ease-in-out text-gray-700 hover:bg-[#a57800]/90 hover:text-white w-full text-left"
            onClick={handleLogout}
            aria-label="Logout"
          >
            {/* Icon Color: Used yellowish color for the logout icon when not active */}
            <FaSignOutAlt className="text-xl text-[#b58900] group-hover:text-white" />
            {!isCollapsed && <span className="ml-4">Logout</span>}
          </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
}