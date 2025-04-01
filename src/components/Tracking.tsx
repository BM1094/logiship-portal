import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Truck, MapPin, Box, BarChart } from "lucide-react";
import { usePackageStore } from "../stores/packageStore";
import { format } from "date-fns";

const Tracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [activeTab, setActiveTab] = useState("status");
  const { getPackage } = usePackageStore();
  const [packageInfo, setPackageInfo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      const foundPackage = getPackage(trackingId);
      
      if (foundPackage) {
        setPackageInfo(foundPackage);
        setIsTracking(true);
      } else {
        // For demo purposes, show the sample tracking
        setPackageInfo(null);
        setIsTracking(true);
      }
    }
  };

  // Use demo tracking steps if no package is found
  const trackingSteps = packageInfo?.trackingHistory || [
    {
      status: "Order Received",
      location: "Los Angeles, CA",
      date: "May 24, 2023",
      time: "09:45 AM",
      completed: true,
    },
    {
      status: "Processing",
      location: "Los Angeles, CA",
      date: "May 24, 2023",
      time: "02:30 PM",
      completed: true,
    },
    {
      status: "Shipped",
      location: "Los Angeles, CA",
      date: "May 25, 2023",
      time: "10:15 AM",
      completed: true,
    },
    {
      status: "In Transit",
      location: "Chicago, IL",
      date: "May 27, 2023",
      time: "11:30 AM",
      completed: true,
    },
    {
      status: "Out for Delivery",
      location: "New York, NY",
      date: "May 29, 2023",
      time: "08:45 AM",
      completed: false,
    },
    {
      status: "Delivered",
      location: "New York, NY",
      date: "May 29, 2023",
      time: "02:00 PM",
      completed: false,
    },
  ];

  // Format tracking steps for display
  const displaySteps = packageInfo ? trackingSteps.map(step => ({
    ...step,
    completed: true,
    date: format(new Date(step.date), "MMM dd, yyyy"),
    time: step.time || format(new Date(step.date), "hh:mm a")
  })) : trackingSteps;

  return (
    <div id="tracking" className="bg-white">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Track Your Shipment</h2>
            <p className="section-subtitle">
              Enter your tracking number to get real-time updates on your
              shipment's status and location.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Package size={20} className="text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-colors"
                    placeholder="Enter tracking number (e.g., SHIP-123456789)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-logistics-800 text-white px-8 py-3.5 rounded-md hover:bg-logistics-700 transition-colors inline-flex items-center justify-center whitespace-nowrap"
                  disabled={!trackingId.trim()}
                >
                  <Search size={18} className="mr-2" />
                  Track Package
                </button>
              </div>
            </form>

            {isTracking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-logistics-50 rounded-lg p-6 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tracking Number
                      </p>
                      <p className="text-lg font-medium">{packageInfo?.id || `SHIP-${trackingId}`}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                        <Truck size={14} className="mr-1" />
                        {packageInfo?.status || "In Transit"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Estimated Delivery
                      </p>
                      <p className="font-medium">
                        {packageInfo?.route?.estimatedDelivery 
                          ? format(new Date(packageInfo.route.estimatedDelivery), "MMM dd, yyyy") 
                          : "May 29, 2023"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Current Location
                      </p>
                      <p className="font-medium">
                        {displaySteps[displaySteps.length - 1]?.location || "Chicago, IL"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Shipping Method
                      </p>
                      <p className="font-medium">{packageInfo?.shipment?.type || "Express Freight"}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex border-b border-gray-200">
                    <button
                      className={`px-6 py-3 text-sm font-medium ${
                        activeTab === "status"
                          ? "border-b-2 border-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setActiveTab("status")}
                    >
                      Shipment Status
                    </button>
                    <button
                      className={`px-6 py-3 text-sm font-medium ${
                        activeTab === "details"
                          ? "border-b-2 border-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setActiveTab("details")}
                    >
                      Shipment Details
                    </button>
                  </div>
                </div>

                {activeTab === "status" && (
                  <div className="relative">
                    {/* Progress Bar */}
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>

                    <div className="space-y-8">
                      {displaySteps.map((step, index) => (
                        <div
                          key={index}
                          className="relative pl-12"
                        >
                          <div
                            className={`absolute left-2 w-5 h-5 rounded-full ${
                              step.completed
                                ? "bg-green-500"
                                : "bg-gray-300"
                            } flex items-center justify-center -translate-x-1/2`}
                          >
                            {step.completed && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{step.status}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                {step.location}
                              </span>
                              <span className="hidden sm:block mx-2">•</span>
                              <span>
                                {step.date} at {step.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Box size={16} className="mr-2 text-logistics-800" />
                        Package Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <p className="text-muted-foreground">Weight:</p>
                          <p>{packageInfo?.shipment?.weight || "2.5 kg"}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-muted-foreground">Dimensions:</p>
                          <p>{packageInfo?.shipment?.dimensions || "30cm × 25cm × 15cm"}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-muted-foreground">Pieces:</p>
                          <p>1</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <BarChart
                          size={16}
                          className="mr-2 text-logistics-800"
                        />
                        Shipping Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <p className="text-muted-foreground">Service Type:</p>
                          <p>{packageInfo?.shipment?.type || "Express Freight"}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-muted-foreground">
                            Shipping Date:
                          </p>
                          <p>{displaySteps[2]?.date || "May 25, 2023"}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-muted-foreground">
                            Estimated Delivery:
                          </p>
                          <p>
                            {packageInfo?.route?.estimatedDelivery 
                              ? format(new Date(packageInfo.route.estimatedDelivery), "MMM dd, yyyy") 
                              : "May 29, 2023"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          <div className="bg-logistics-50 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-logistics-100 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="bg-logistics-800 text-white p-3 rounded-full mr-4">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-medium">
                    Advanced Tracking System
                  </h3>
                  <p className="text-muted-foreground">
                    Real-time visibility for all your shipments
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Real-Time Tracking",
                    description:
                      "Monitor your shipments in real-time with precise location updates.",
                  },
                  {
                    title: "Status Notifications",
                    description:
                      "Receive automated alerts about important shipment milestones.",
                  },
                  {
                    title: "Delivery Estimates",
                    description:
                      "Get accurate delivery time estimates based on current conditions.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;

const Check = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
