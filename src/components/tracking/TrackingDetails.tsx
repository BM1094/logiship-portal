
import { Box, BarChart } from "lucide-react";
import { format } from "date-fns";

interface TrackingDetailsProps {
  packageInfo: any | null;
  steps: any[];
}

const TrackingDetails = ({ packageInfo, steps }: TrackingDetailsProps) => {
  return (
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
            <p>{steps[2]?.date || "May 25, 2023"}</p>
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
  );
};

export default TrackingDetails;
