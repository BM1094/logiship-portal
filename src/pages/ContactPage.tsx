
import React from "react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="pt-20 pb-8 bg-gray-50">
          <div className="section-container">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Get in touch with our team for inquiries or support
            </p>
          </div>
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
