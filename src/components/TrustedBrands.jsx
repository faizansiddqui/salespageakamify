import React from "react";
import "./TrustedBrands.css";

const TrustedBrands = () => {
  const brands = [
    { name: "Google", logo: "./brands/google.png" },
    { name: "Meta", logo: "./brands/meta.png" },
    { name: "WhatsApp", logo: "./brands/whatsapp.png" },
    { name: "Ekart", logo: "./brands/ekart.png" },
    { name: "Bluedart", logo: "./brands/bluedart.png" },
    { name: "Google", logo: "./brands/google.png" },
    { name: "Meta", logo: "./brands/meta.png" },
    { name: "WhatsApp", logo: "./brands/whatsapp.png" },
    { name: "Ekart", logo: "./brands/ekart.png" },
    { name: "Bluedart", logo: "./brands/bluedart.png" },
  ];

  return (
    <section className="trusted-brands-section">
      <div className="trusted-brands-container">
        <h2 className="trusted-brands-heading">Founders & Marketers Love us</h2>
        <p className="trusted-brands-subtext">
          Trusted by 100+ Businesses across 5+ Countries
        </p>
        <div className="brands-marquee">
          <div className="brands-track">
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} className="brand-item">
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
