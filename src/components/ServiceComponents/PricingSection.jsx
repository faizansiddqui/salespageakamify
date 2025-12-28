import React, { useState } from "react";
import { Clock, RotateCcw, ChevronDown, ArrowRight } from "lucide-react";
import "./PricingSection.css";

const PricingSection = ({
  selectedPackage,
  onPackageSelect,
  price,
  features,
}) => {
  // Define delivery time and revisions for each package
  const packageDetails = {
    basic: {
      deliveryTime: "4-day delivery",
      revisions: "1 Revision",
      title: "E-commerce Starter",
      description: "A clean, responsive online store to get you selling fast.",
    },
    standard: {
      deliveryTime: "10-day delivery",
      revisions: "2 Revisions",
      title: "E-commerce Standard",
      description:
        "All Starter features + progressive web app and conversion tools to grow sales.",
    },
    premium: {
      deliveryTime: "30-day delivery",
      revisions: "2 Revisions",
      title: "Pro Multi-Vendor Marketplace",
      description:
        "Full multi-seller marketplace with marketing and automation tools for scaling.",
    },
  };

  const [showFeatures, setShowFeatures] = useState(true);

  const toggleFeatures = () => {
    setShowFeatures(!showFeatures);
  };

  return (
    <div className="package-selector">
      <div className="tabs">
        <div
          className={`tab ${selectedPackage === "basic" ? "active" : ""}`}
          onClick={() => onPackageSelect("basic")}
        >
          Basic
        </div>
        <div
          className={`tab ${selectedPackage === "standard" ? "active" : ""}`}
          onClick={() => onPackageSelect("standard")}
        >
          Standard
        </div>
        <div
          className={`tab ${selectedPackage === "premium" ? "active" : ""}`}
          onClick={() => onPackageSelect("premium")}
        >
          Premium
        </div>
      </div>
      <div className="packages">
        {/* Show only the active package */}
        <div
          key={selectedPackage}
          className={`package selected ${selectedPackage}`}
        >
          <div className="title">
            <h3>{packageDetails[selectedPackage].title}</h3>
            <p className="price">₹{price[selectedPackage].toLocaleString()}</p>
          </div>
          {packageDetails[selectedPackage].description && (
            <p className="package-description">
              {packageDetails[selectedPackage].description}
            </p>
          )}
          <div className="package-info">
            <span className="delivery-time">
              <Clock size={20} color="#999ba1" />
              {packageDetails[selectedPackage].deliveryTime}
            </span>
            <span className="revisions">
              <RotateCcw size={20} color="#999ba1" />
              {packageDetails[selectedPackage].revisions}
            </span>
          </div>
          <h4 className="features-toggle" onClick={toggleFeatures}>
            What's Included
            <span className={`dropdown-icon ${showFeatures ? "expanded" : ""}`}>
              <ChevronDown size={25} />
            </span>
          </h4>
          {showFeatures && (
            <ul>
              {features[selectedPackage].map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}
          <button className="select-button">
            <div>Continue</div>
            <ArrowRight className="arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
