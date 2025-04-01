
import React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="pt-20 pb-8 bg-gray-50">
          <div className="section-container">
            <h1 className="text-4xl font-bold mb-4">About Our Company</h1>
            <p className="text-lg text-muted-foreground">
              Learn more about our history, mission, and the team behind our logistics excellence
            </p>
          </div>
        </div>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
