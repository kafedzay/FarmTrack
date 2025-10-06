import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { GrClose, GrMoney } from "react-icons/gr";
import { PiMoneyWavyBold,PiFarmFill } from "react-icons/pi";
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
      icon: <PiFarmFill className="text-xl" />,
      label: "Create Farm",
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
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#b58900] text-white h-14 flex items-center justify-between px-4 z-50 shadow-md">
        <button
          className="p-2 rounded-md hover:bg-[#a57800]/80 transition-all duration-200 ease-in-out"
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

      {/* Sidebar */}
      <div
        className={`bg-[#b58900] text-white shadow-lg transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-64"} 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 fixed md:static z-40 top-14 md:top-0 h-[calc(100vh-3.5rem)] md:h-screen flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <h1 className="text-2xl font-semibold tracking-tight">FarmTrack</h1>
          )}
          <button
            className="p-2 hidden md:block rounded-md hover:bg-[#a57800]/80 transition-all duration-200"
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
                `flex items-center p-3 mx-2 rounded-md text-base font-medium transition-all duration-200 ease-in-out hover:bg-[#a57800]/80 ${isActive ? "bg-[#a57800] text-yellow-100 shadow-sm" : ""
                }`
              }
              onClick={closeMobileMenu}
              aria-label={page.label}
            >
              <span className="text-xl">{page.icon}</span>
              {!isCollapsed && <span className="ml-4">{page.label}</span>}
            </NavLink>
          ))}
        </nav>
        {/* Logout Button */}
        <div className="p-4 mt-auto">
          <h1 className="font-bold">Welcome {user?.email} 👋</h1>
          <button
            className="flex items-center p-3 mx-2 rounded-md text-base font-medium transition-all duration-200 ease-in-out hover:bg-[#a57800]/80 w-full text-left"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <FaSignOutAlt className="text-xl" />
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
