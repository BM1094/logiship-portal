
import { motion } from "framer-motion";
import { Truck } from "lucide-react";

const TrackingFeatures = () => {
  return (
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
  );
};

export default TrackingFeatures;
