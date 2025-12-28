import React, { useState } from "react";
import "./Faq.css";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What does Akamify do?",
      answer:
        "Akamify provides comprehensive e-commerce solutions including automation, marketing, and customer support services to help businesses grow and streamline their operations.",
    },
    {
      question: "How do you handle Customer Support?",
      answer:
        "We offer 24/7 customer support through multiple channels including chat, email, and phone to ensure our clients receive timely assistance whenever they need it.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-heading">FAQs</h2>
        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div key={index} className="faqs-items">
              <div
                className={`faq-question ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => toggleFaq(index)}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
