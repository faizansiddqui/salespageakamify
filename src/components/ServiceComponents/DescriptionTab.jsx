import React from "react";
import "./DescriptionTab.css";

const DescriptionTab = ({ description }) => {
  return (
    <div className="service-description">
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default DescriptionTab;
