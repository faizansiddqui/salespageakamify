import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FaqTab = ({ faqs }) => {
  // {} ki jagah null use karein taaki sirf ek index track ho sake
  const [activeIndex, setActiveIndex] = useState(null);

  const handleInteraction = (index) => {
    // Agar wahi index dobara click/hover ho toh close kar de, warna naya open kare
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-5 px-0">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        Frequently Asked Questions
      </h2>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen 
                  ? "bg-indigo-50/30 border-indigo-200 shadow-md translate-y-[-2px]" 
                  : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
              }`}
            >
              {/* Question / Header */}
              <button
                onClick={() => handleInteraction(index)}
                onMouseEnter={() => handleInteraction(index)}
                className="w-full flex justify-between items-center p-4 md:p-6 text-left focus:outline-none cursor-pointer group"
              >
                <span
                  className={`font-semibold transition-colors duration-300 ${
                    isOpen ? "text-indigo-700" : "text-gray-700 group-hover:text-gray-900"
                  } text-base md:text-lg`}
                >
                  {faq.question}
                </span>

                {/* Icon with smoother rotation */}
                <div
                  className={`ml-4 flex-shrink-0 p-1 rounded-full transition-all duration-500 ${
                    isOpen ? "rotate-180 bg-indigo-100 text-indigo-600" : "rotate-0 text-gray-400 bg-gray-50"
                  }`}
                >
                  <ChevronDown size={20} className="md:w-6 md:h-6" />
                </div>
              </button>

              {/* Answer - Improved Smooth Transition */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-gray-600 leading-relaxed">
                    <div className="pt-2 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqTab;
