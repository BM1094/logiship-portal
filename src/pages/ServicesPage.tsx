
import React from "react";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="pt-20 pb-8 bg-gray-50">
          <div className="section-container">
            <h1 className="text-4xl font-bold mb-4">Our Logistics Services</h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive range of logistics solutions tailored to your business needs
            </p>
          </div>
        </div>
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
