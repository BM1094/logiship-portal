
import React from "react";
import Navbar from "../components/Navbar";
import Tracking from "../components/tracking";
import Footer from "../components/Footer";

const TrackPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="pt-20 pb-8 bg-gray-50">
          <div className="section-container">
            <h1 className="text-4xl font-bold mb-4">Track Your Shipment</h1>
            <p className="text-lg text-muted-foreground">
              Get real-time updates on your package location and delivery status
            </p>
          </div>
        </div>
        <Tracking />
      </main>
      <Footer />
    </div>
  );
};

export default TrackPage;
