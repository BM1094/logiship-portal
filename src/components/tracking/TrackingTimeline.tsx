
import { Check } from "lucide-react";
import { MapPin } from "lucide-react";

interface TrackingStep {
  status: string;
  location: string;
  date: string;
  time: string;
  completed: boolean;
}

interface TrackingTimelineProps {
  steps: TrackingStep[];
}

const TrackingTimeline = ({ steps }: TrackingTimelineProps) => {
  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>

      <div className="space-y-8">
        {steps.map((step, index) => (
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
  );
};

export default TrackingTimeline;
