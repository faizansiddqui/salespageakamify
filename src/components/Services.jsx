import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <section className="services-section" style={{ display: 'block', visibility: 'visible', opacity: 1, backgroundColor: 'lightblue', minHeight: '500px' }}>
      <div className="services-container" style={{ backgroundColor: 'lightgreen' }}>
        <div className="services-list" style={{ backgroundColor: 'lightyellow' }}>
          {/* First service - Text on left, image on right */}
          <div className="service-item service-item-left" style={{ backgroundColor: 'lightcoral', minHeight: '250px' }}>
            <div className="service-content">
              <div className="service-text">
                <div className="service-icon-title">
                  <span className="service-icon">💬</span>
                  <h3 className="service-title">WhatsApp Marketing</h3>
                </div>
                <p className="service-description">
                  Reach your customers directly through WhatsApp with automated campaigns and personalized messaging.
                </p>
                <button className="explore-btn">Explore More</button>
              </div>
            </div>
            <div
              className="service-image"
              style={{ backgroundColor: "#ffe5e5" }}
            >
              <div className="image-placeholder">Service Image</div>
            </div>
          </div>

          {/* Second service - Image on left, text on right */}
          <div className="service-item service-item-right" style={{ backgroundColor: 'lightblue', minHeight: '250px' }}>
            <div
              className="service-image"
              style={{ backgroundColor: "#ffe5b4" }}
            >
              <div className="image-placeholder">Service Image</div>
            </div>
            <div className="service-content">
              <div className="service-text">
                <div className="service-icon-title">
                  <span className="service-icon">📧</span>
                  <h3 className="service-title">Email Marketing</h3>
                </div>
                <p className="service-description">
                  Create targeted email campaigns that drive engagement and convert leads into customers.
                </p>
                <button className="explore-btn">Explore More</button>
              </div>
            </div>
          </div>

          {/* Third service - Text on left, image on right */}
          <div className="service-item service-item-left" style={{ backgroundColor: 'lightpink', minHeight: '250px' }}>
            <div className="service-content">
              <div className="service-text">
                <div className="service-icon-title">
                  <span className="service-icon">📱</span>
                  <h3 className="service-title">Meta Ads</h3>
                </div>
                <p className="service-description">
                  Run effective advertising campaigns on Facebook and Instagram to grow your audience.
                </p>
                <button className="explore-btn">Explore More</button>
              </div>
            </div>
            <div
              className="service-image"
              style={{ backgroundColor: "#d4edda" }}
            >
              <div className="image-placeholder">Service Image</div>
            </div>
          </div>

          {/* Fourth service - Image on left, text on right */}
          <div className="service-item service-item-right" style={{ backgroundColor: 'lightgray', minHeight: '250px' }}>
            <div
              className="service-image"
              style={{ backgroundColor: "#cce7ff" }}
            >
              <div className="image-placeholder">Service Image</div>
            </div>
            <div className="service-content">
              <div className="service-text">
                <div className="service-icon-title">
                  <span className="service-icon">✉️</span>
                  <h3 className="service-title">Email Marketing</h3>
                </div>
                <p className="service-description">
                  Advanced email automation tools to nurture your leads and retain customers.
                </p>
                <button className="explore-btn">Explore More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;