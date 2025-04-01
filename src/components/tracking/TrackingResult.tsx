
import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, Box, BarChart } from "lucide-react";
import { format, parseISO } from "date-fns";
import TrackingTimeline from "./TrackingTimeline";
import TrackingDetails from "./TrackingDetails";
import { Package } from "../../stores/packageStore";

interface TrackingResultProps {
  packageInfo: Package | null;
}

const TrackingResult = ({ packageInfo }: TrackingResultProps) => {
  const [activeTab, setActiveTab] = useState("status");

  // Use demo tracking steps if no package is found
  const demoTrackingSteps = [
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
  const displaySteps = packageInfo 
    ? packageInfo.trackingHistory.map(step => ({
        ...step,
        completed: true,
        date: format(parseISO(step.date), "MMM dd, yyyy"),
        time: step.time || format(parseISO(step.date), "hh:mm a")
      })) 
    : demoTrackingSteps;

  return (
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
            <p className="text-lg font-medium">{packageInfo?.id || `SHIP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`}</p>
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
        <TrackingTimeline steps={displaySteps} />
      )}

      {activeTab === "details" && (
        <TrackingDetails packageInfo={packageInfo} steps={displaySteps} />
      )}
    </motion.div>
  );
};

export default TrackingResult;
