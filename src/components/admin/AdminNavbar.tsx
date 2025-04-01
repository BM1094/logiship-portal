
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, BarChart3, Settings, LogOut } from "lucide-react";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div className="bg-logistics-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/admin/dashboard" className="text-xl font-bold">
                Logistics Admin
              </Link>
            </div>
            <div className="ml-6 flex space-x-4 items-center">
              <Link to="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-logistics-700">
                Dashboard
              </Link>
              <Link to="/admin/packages" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-logistics-700">
                <Package size={18} className="inline mr-1" />
                Packages
              </Link>
              <Link to="/admin/reports" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-logistics-700">
                <BarChart3 size={18} className="inline mr-1" />
                Reports
              </Link>
              <Link to="/admin/settings" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-logistics-700">
                <Settings size={18} className="inline mr-1" />
                Settings
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/" className="mr-4 text-sm hover:underline">View Website</Link>
            <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-logistics-700">
              <LogOut size={18} className="mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
