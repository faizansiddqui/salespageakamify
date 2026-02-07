import { useState, useEffect, useRef } from "react";
import { Clock, RotateCcw, ChevronDown, ArrowRight, Calendar, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingSection = ({ selectedPackage, onPackageSelect, price, features }) => {
  const navigate = useNavigate();
  const [showFeatures, setShowFeatures] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // To ensure it only opens once on scroll
  const sectionRef = useRef(null);

  const packageDetails = {
    starter: {
      deliveryTime: "4-day delivery",
      revisions: "1 Revision",
      title: "E-commerce Starter",
      description: "A clean, responsive online store to get you selling fast.",
    },
    standard: {
      deliveryTime: "10-day delivery",
      revisions: "2 Revisions",
      title: "E-commerce Standard",
      description: "All Starter features + progressive web app and conversion tools.",
    },
    enterprises: {
      deliveryTime: "30-day delivery",
      revisions: "2 Revisions",
      title: "Pro Multi-Vendor Marketplace",
      description: "Full multi-seller marketplace with marketing and automation tools.",
    },
  };

  // --- NEW: Scroll Detection Logic ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If 60% of the component is visible and hasn't animated yet
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setShowFeatures(true);
          
          // Automatically close after 2.5 seconds
          setTimeout(() => {
            setShowFeatures(false);
          }, 2500);
        }
      },
      { threshold: 0.6 } // Trigger when 60% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const currentDetails = packageDetails[selectedPackage];

  return (
    <div 
      ref={sectionRef}
      className="w-full max-w-[450px] mx-auto bg-white border border-gray-200  rounded-1xl overflow-hidden transition-all duration-300 hover:shadow-gray-200/50"
    >
      {/* Tabs Section */}
      <div className="flex bg-gray-50/50 border-b border-gray-100">
        {["starter", "standard", "enterprises"].map((pkg) => (
          <button
            key={pkg}
            onClick={() => onPackageSelect(pkg)}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              selectedPackage === pkg
                ? "bg-white text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
            }`}
          >
            {pkg}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8">
        <div className="flex gap-[6px] items-center mb-4">
          <h3 className="text-1xl font-bold text-gray-700 leading-tight w-2/3">
            {currentDetails.title}
          </h3>
          <span className="text-1xl font-bold text-gray-900">
            ₹{price[selectedPackage].toLocaleString()}
          </span>
        </div>

        <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
          {currentDetails.description}
        </p>

        {/* Stats */}
        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Clock size={18} className="text-gray-400" />
            {currentDetails.deliveryTime}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <RotateCcw size={18} className="text-gray-400" />
            {currentDetails.revisions}
          </div>
        </div>

        {/* What's Included Dropdown */}
        <div 
          className="mb-6"
          onMouseEnter={() => setShowFeatures(true)} // Desktop Hover Open
          onMouseLeave={() => setShowFeatures(false)} // Desktop Hover Close
        >
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="flex items-center justify-between w-full py-2 group cursor-pointer"
          >
            <span className="font-bold text-gray-800 uppercase text-xs tracking-widest flex items-center gap-2">
              What's Included
              {/* Suggestion: A small notification dot to grab attention */}
              {!hasAnimated && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
              )}
            </span>
            <ChevronDown
              size={20}
              className={`transition-all duration-500 ease-in-out ${
                showFeatures ? "rotate-180 text-black" : "text-gray-400 group-hover:text-black animate-bounce"
              }`}
              // Added animate-bounce logic above to grab attention until first interaction
            />
          </button>

          {/* Unfolding Content */}
          <div
            className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
              showFeatures ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <ul className="space-y-3">
                {features[selectedPackage].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-[14px] text-gray-600 font-medium">
                    <Check size={16} className="text-black flex-shrink-0" strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-8">
          <button
            onClick={() => navigate("/book-enrollment")}
            className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gray-800 active:scale-[0.98] shadow-lg shadow-black/10"
          >
            BOOK ENROLLMENT
            <Calendar size={18} />
          </button>
          
          <button
            onClick={() => navigate("/demo")}
            className="w-full bg-white border-2 border-gray-100 text-gray-800 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:border-black hover:bg-gray-50 active:scale-[0.98]"
          >
            VIEW DEMO
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;