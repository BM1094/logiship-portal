
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePackageStore } from "../../stores/packageStore";
import { format } from "date-fns";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { packages } = usePackageStore();
  
  useEffect(() => {
    // Check if user is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsAuthenticated(adminLoggedIn);
    
    if (!adminLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);
  
  // Only render the dashboard if authenticated
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="section-container py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard 
                title="Total Packages" 
                value={packages.length.toString()} 
                change={packages.length > 0 ? "+1 from last login" : "No packages yet"} 
                positive={true} 
              />
              <DashboardCard 
                title="In Transit" 
                value={packages.filter(p => p.status === "In Transit").length.toString()} 
                change="Packages currently being delivered" 
                positive={true} 
              />
              <DashboardCard 
                title="Delivered" 
                value={packages.filter(p => p.status === "Delivered").length.toString()} 
                change="Successfully delivered packages" 
                positive={true} 
              />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
              <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => navigate("/admin/packages/new")} className="bg-logistics-800 hover:bg-logistics-700">
                  Register New Package
                </Button>
                <Button variant="outline">Generate Reports</Button>
                <Button variant="outline">Manage Users</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="packages" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Recent Packages</h2>
              <Button onClick={() => navigate("/admin/packages/new")} className="bg-logistics-800 hover:bg-logistics-700">
                Register New Package
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-3 text-left">Tracking ID</th>
                      <th className="px-6 py-3 text-left">Customer</th>
                      <th className="px-6 py-3 text-left">Origin</th>
                      <th className="px-6 py-3 text-left">Destination</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {packages.length > 0 ? (
                      packages.map((pkg) => (
                        <tr key={pkg.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">{pkg.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{pkg.customer.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{pkg.route.origin}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{pkg.route.destination}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              pkg.status === "Delivered" 
                                ? "bg-green-100 text-green-800" 
                                : pkg.status === "In Transit" 
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {pkg.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Update</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                          No packages have been registered yet.
                          <div className="mt-2">
                            <Button 
                              onClick={() => navigate("/admin/packages/new")} 
                              variant="outline" 
                              size="sm"
                            >
                              Register Your First Package
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-4">Reports</h2>
              <p className="text-muted-foreground mb-6">Generate and download detailed reports about your shipments and operations.</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Monthly Performance</h3>
                    <p className="text-sm text-muted-foreground">Summary of all shipments and delivery performance</p>
                  </div>
                  <Button variant="outline">Generate</Button>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Route Analysis</h3>
                    <p className="text-sm text-muted-foreground">Analyze delivery routes and optimization opportunities</p>
                  </div>
                  <Button variant="outline">Generate</Button>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Customer Insights</h3>
                    <p className="text-sm text-muted-foreground">Customer shipping patterns and satisfaction metrics</p>
                  </div>
                  <Button variant="outline">Generate</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, change, positive }: { 
  title: string; 
  value: string; 
  change: string; 
  positive: boolean;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h3 className="text-muted-foreground text-sm font-medium mb-2">{title}</h3>
    <p className="text-3xl font-bold mb-1">{value}</p>
    <p className={`text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
  </div>
);

export default AdminDashboard;
