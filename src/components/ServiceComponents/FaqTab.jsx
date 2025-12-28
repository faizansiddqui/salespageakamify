import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./FaqTab.css";

const FaqTab = ({ faqs }) => {
  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="faq-section">
      <h2>FAQs</h2>
      <div className="faqs">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 onClick={() => toggleFaq(index)}>
              {faq.question}
              <span
                className={`faq-toggle ${openFaqs[index] ? "expanded" : ""}`}
              >
                <ChevronDown size={25} />
              </span>
            </h3>
            {openFaqs[index] && <p>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqTab;
