import React, { useState } from "react";
import "./Navigation.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>Akamify</h2>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? "show" : ""}`}>
          <a
            href="#home"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#services"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="#about"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>

        <div className={`nav-cta ${isMenuOpen ? "show" : ""}`}>
          <button className="nav-btn">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
