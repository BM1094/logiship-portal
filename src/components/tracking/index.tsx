
import { useState } from "react";
import { motion } from "framer-motion";
import TrackingForm from "./TrackingForm";
import TrackingResult from "./TrackingResult";
import TrackingFeatures from "./TrackingFeatures";

const Tracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [packageInfo, setPackageInfo] = useState(null);

  const handleTrackingSubmit = (foundPackage, trackingStatus) => {
    setPackageInfo(foundPackage);
    setIsTracking(trackingStatus);
  };

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
            <TrackingForm onSubmit={handleTrackingSubmit} />

            {isTracking && <TrackingResult packageInfo={packageInfo} />}
          </motion.div>

          <TrackingFeatures />
        </div>
      </div>
    </div>
  );
};

export default Tracking;
