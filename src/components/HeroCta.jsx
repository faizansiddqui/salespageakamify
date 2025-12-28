import React from "react";
import "./HeroCta.css";

const HeroCta = () => {
  return (
    <section className="hero-cta-section">
      <div className="hero-cta-container">
        <div className="hero-cta-content">
          <h2 className="hero-cta-heading">
            <span className="robot-icon">🤖</span>
            Automate <span>E-Commerce</span> Business
          </h2>
          <p className="hero-cta-subtitle">
            We are providing full E-Commerce Solution at one place.
            <br />
            Your all tech needs completed here.
          </p>
          <div className="hero-cta-buttons">
            <button className="btn btn-primary">Join Live Demo</button>
            <button className="btn btn-secondary">Book Enquiry</button>
          </div>
        </div>
        <div className="hero-cta-image-container">
          <img
            src="/hero-ecommerce-automation.png"
            alt="E-commerce Automation Platform"
            className="hero-cta-image"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroCta;
