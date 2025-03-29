import React, { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Ship, Plane, Package, AlertCircle, BarChart3, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Truck size={24} />,
    title: "Road Freight",
    description: "Efficient road transportation with nationwide coverage and flexible delivery options.",
    color: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: <Ship size={24} />,
    title: "Ocean Freight",
    description: "Cost-effective sea freight solutions for international shipping with global port coverage.",
    color: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    icon: <Plane size={24} />,
    title: "Air Freight",
    description: "Express air freight services for time-sensitive shipments to any global destination.",
    color: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    icon: <Package size={24} />,
    title: "Warehousing",
    description: "State-of-the-art storage facilities with inventory management and fulfillment services.",
    color: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    icon: <AlertCircle size={24} />,
    title: "Cargo Insurance",
    description: "Comprehensive coverage options to protect your valuable shipments during transit.",
    color: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Supply Chain",
    description: "End-to-end supply chain solutions with analytics and optimization strategies.",
    color: "bg-red-50",
    iconColor: "text-red-500",
  },
];

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`p-6 rounded-lg shadow-sm ${service.color} border border-white/80 transition-all duration-300 ${
        isHovered ? "shadow-md -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${service.iconColor} bg-white`}
      >
        {service.icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{service.title}</h3>
      <p className="text-muted-foreground mb-4">{service.description}</p>
      <Link
        to={`/services/${service.title.toLowerCase().replace(" ", "-")}`}
        className={`text-sm font-medium ${service.iconColor} inline-flex items-center btn-effect`}
      >
        Learn more
        <svg
          className="ml-1 w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </Link>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Clock size={20} />,
      title: "Time-Efficient",
      description: "Save valuable time with our optimized logistics solutions",
    },
    {
      icon: <Shield size={20} />,
      title: "Secure Transport",
      description: "Your cargo's security is our top priority during transit",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Cost-Effective",
      description: "Optimized routes and processes to minimize your costs",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-start space-x-4"
        >
          <div className="bg-logistics-800 text-white p-3 rounded-full">
            {feature.icon}
          </div>
          <div>
            <h4 className="text-lg font-medium mb-1">{feature.title}</h4>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Services = () => {
  return (
    <div id="services" className="bg-gray-50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="section-title">Our Logistics Services</h2>
          <p className="section-subtitle">
            Comprehensive logistics solutions tailored to your business needs.
            We offer a wide range of services to ensure your shipments reach
            their destination safely and on time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <Features />
      </div>
    </div>
  );
};

export default Services;
