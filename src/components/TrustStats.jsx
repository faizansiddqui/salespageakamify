import React, { useState, useEffect, useRef } from "react";
import "./TrustStats.css";

const TrustStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { number: 20, label: "Businesses", suffix: "+" },
    { number: 7, label: "Experience", suffix: "+ Years" },
    { number: 20, label: "Projects", suffix: "+" },
    { number: 98, label: "Satisfied Rate", suffix: "%" },
  ];

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // State for each animated counter
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  // Animation effect when the section becomes visible
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // Animation duration in ms
      const frameDuration = 1000 / 60; // ~60fps
      const totalFrames = Math.round(duration / frameDuration);

      const intervals = stats.map((stat, index) => {
        const increment = stat.number / totalFrames;
        let frame = 0;

        const interval = setInterval(() => {
          frame++;
          const currentCount = Math.min(
            Math.floor(increment * frame),
            stat.number
          );
          setAnimatedValues((prev) => {
            const newValues = [...prev];
            newValues[index] = currentCount;
            return newValues;
          });

          if (frame >= totalFrames) {
            clearInterval(interval);
            setAnimatedValues((prev) => {
              const newValues = [...prev];
              newValues[index] = stat.number;
              return newValues;
            });
          }
        }, frameDuration);

        return interval;
      });

      return () => {
        intervals.forEach((interval) => clearInterval(interval));
      };
    }
  }, [isVisible]);

  // Format the number based on animation state
  const formatNumber = (value, suffix, index) => {
    // Special handling for years to show "X Years" format
    if (index === 1) {
      return value + suffix;
    }

    return value + suffix;
  };

  return (
    <section ref={sectionRef} className="trust-stats-section">
      <div className="trust-stats-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">
                {isVisible
                  ? formatNumber(animatedValues[index], stat.suffix, index)
                  : "0" + stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
