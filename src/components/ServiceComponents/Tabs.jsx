import React from "react";
import "./Tabs.css";

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === "description" ? "tab active" : "tab"}
        onClick={() => onTabChange("description")}
      >
        Description
      </button>
      <button
        className={activeTab === "faq" ? "tab active" : "tab"}
        onClick={() => onTabChange("faq")}
      >
        FAQ
      </button>
      <button
        className={activeTab === "reviews" ? "tab active" : "tab"}
        onClick={() => onTabChange("reviews")}
      >
        Reviews
      </button>
    </div>
  );
};

export default Tabs;
