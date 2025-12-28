import React from "react";
import "./Differentiator.css";
import VideoPlayer from './VideoPlayer';


const Differentiator = () => {
  return (
    <section className="differentiator-section">
      <div className="differentiator-container">
        <h2 className="differentiator-heading">
          How We Are Different From Other
          <br />
          E-Commerce Solution Provider
        </h2>
        <p className="differentiator-subtext">
          We are providing full E-Commerce Solution at one place.
          <br />
          Your all tech needs completed here.
        </p>
         <div className="differentiator-video-container">
          <VideoPlayer />
        </div>
      </div>
    </section>
  );
};

export default Differentiator;
