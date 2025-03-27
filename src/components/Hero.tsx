
import { ArrowRight, Truck, Package, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative pt-24 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 bg-primary/5 w-2/3 h-full rounded-bl-[100px]"></div>
        <div className="absolute top-40 left-10 bg-logistics-100 w-24 h-24 rounded-full animate-float opacity-40"></div>
        <div className="absolute bottom-20 right-10 bg-logistics-100 w-40 h-40 rounded-full animate-float opacity-30" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block animate-fadeIn opacity-0" style={{ animationDelay: "0.2s" }}>
              <span className="px-3 py-1 text-sm bg-logistics-100 text-logistics-800 rounded-full">
                Reliable Logistics Solutions
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight animate-fadeIn opacity-0" style={{ animationDelay: "0.4s" }}>
              Global Shipping <br />
              <span className="text-primary">Simplified</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg animate-fadeIn opacity-0" style={{ animationDelay: "0.6s" }}>
              Seamless logistics and transportation solutions tailored to your business needs. Track shipments in real-time and get your goods delivered on time, every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn opacity-0" style={{ animationDelay: "0.8s" }}>
              <Link
                to="/quote"
                className="bg-logistics-800 text-white px-8 py-3.5 rounded-md hover:bg-logistics-700 transition-colors inline-flex items-center justify-center"
              >
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/track"
                className="border border-logistics-200 bg-white px-8 py-3.5 rounded-md hover:bg-logistics-50 transition-colors inline-flex items-center justify-center"
              >
                Track Shipment
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
              <div className="relative bg-white shadow-xl rounded-lg p-8 animate-slideUp opacity-0" style={{ animationDelay: "0.6s" }}>
                <div className="absolute -top-6 left-10 bg-white rounded-md p-3 shadow-lg">
                  <Truck size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-4 mt-4">Instant Delivery</h3>
                <p className="text-muted-foreground">Optimize your supply chain with our advanced logistics solutions and real-time tracking.</p>
                <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-muted-foreground">Delivered</p>
                    <p className="font-medium">1,240+</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Countries</p>
                    <p className="font-medium">120+</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Clients</p>
                    <p className="font-medium">500+</p>
                  </div>
                </div>
              </div>
              <div className="relative bg-white shadow-xl rounded-lg p-6 ml-10 mt-6 animate-slideUp opacity-0" style={{ animationDelay: "0.8s" }}>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Package size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Package #3094</h4>
                    <p className="text-sm text-muted-foreground">In transit</p>
                  </div>
                </div>
              </div>
              <div className="relative bg-white shadow-xl rounded-lg p-6 ml-40 mt-4 animate-slideUp opacity-0" style={{ animationDelay: "1s" }}>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Clock size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">On-time Delivery</h4>
                    <p className="text-sm text-muted-foreground">99.8% success rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn opacity-0" style={{ animationDelay: "1s" }}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-3xl font-medium text-logistics-800">2,500+</p>
            <p className="text-muted-foreground">Deliveries Daily</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-3xl font-medium text-logistics-800">120+</p>
            <p className="text-muted-foreground">Countries Served</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-3xl font-medium text-logistics-800">99.8%</p>
            <p className="text-muted-foreground">On-time Delivery</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-3xl font-medium text-logistics-800">15+ yrs</p>
            <p className="text-muted-foreground">Industry Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
