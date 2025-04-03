
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Package, LayoutDashboard, Truck, LogOut, ClipboardList } from "lucide-react";

const AdminNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // For a real app, you would clear session/auth state here
    navigate("/admin/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-logistics-800">Logistics</span>
              <span className="text-xl font-bold ml-1">Admin</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-3 py-2 text-sm font-medium text-logistics-800 border-b-2 border-logistics-800"
                  : "flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-logistics-800"
              }
            >
              <LayoutDashboard size={18} className="mr-1.5" />
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/packages/new"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-3 py-2 text-sm font-medium text-logistics-800 border-b-2 border-logistics-800"
                  : "flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-logistics-800"
              }
            >
              <Package size={18} className="mr-1.5" />
              Register Package
            </NavLink>
            <NavLink
              to="/admin/quotes"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-3 py-2 text-sm font-medium text-logistics-800 border-b-2 border-logistics-800"
                  : "flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-logistics-800"
              }
            >
              <ClipboardList size={18} className="mr-1.5" />
              Quote Requests
            </NavLink>
          </div>

          <div className="hidden md:flex md:items-center">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-logistics-800"
            >
              <LogOut size={18} className="mr-1.5" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-logistics-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-logistics-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-logistics-50 text-logistics-800 block pl-3 pr-4 py-2 border-l-4 border-logistics-800 text-base font-medium"
                  : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-logistics-800"
              }
            >
              <div className="flex items-center">
                <LayoutDashboard size={18} className="mr-2" />
                Dashboard
              </div>
            </NavLink>
            <NavLink
              to="/admin/packages/new"
              className={({ isActive }) =>
                isActive
                  ? "bg-logistics-50 text-logistics-800 block pl-3 pr-4 py-2 border-l-4 border-logistics-800 text-base font-medium"
                  : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-logistics-800"
              }
            >
              <div className="flex items-center">
                <Package size={18} className="mr-2" />
                Register Package
              </div>
            </NavLink>
            <NavLink
              to="/admin/quotes"
              className={({ isActive }) =>
                isActive
                  ? "bg-logistics-50 text-logistics-800 block pl-3 pr-4 py-2 border-l-4 border-logistics-800 text-base font-medium"
                  : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-logistics-800"
              }
            >
              <div className="flex items-center">
                <ClipboardList size={18} className="mr-2" />
                Quote Requests
              </div>
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-logistics-800"
            >
              <div className="flex items-center">
                <LogOut size={18} className="mr-2" />
                Logout
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
