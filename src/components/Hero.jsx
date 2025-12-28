import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-heading">
            <span className="robot-icon">🤖</span>
            Automate <span>E-Commerce</span> Business
          </h1>
          <p className="hero-subtitle">
            We are providing full E-Commerce solutions at one place.<br />
            Your all tech needs completed here.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Join Live Demo</button>
            <button className="btn btn-secondary">Book Enquiry</button>
          </div>
        </div>
        <div className="hero-image-container">
          <img 
            src="/hero-ecommerce-automation.png" 
            alt="E-commerce Automation Platform" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;