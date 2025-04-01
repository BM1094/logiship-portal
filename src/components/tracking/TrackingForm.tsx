
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";
import { usePackageStore } from "../../stores/packageStore";

interface TrackingFormProps {
  onSubmit: (packageInfo: any | null, isTracking: boolean) => void;
}

const TrackingForm = ({ onSubmit }: TrackingFormProps) => {
  const [trackingId, setTrackingId] = useState("");
  const { getPackage } = usePackageStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      const foundPackage = getPackage(trackingId);
      
      if (foundPackage) {
        onSubmit(foundPackage, true);
      } else {
        // For demo purposes, show the sample tracking
        onSubmit(null, true);
      }
    }
  };

  return (
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
  );
};

export default TrackingForm;
