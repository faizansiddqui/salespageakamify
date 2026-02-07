import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SellerInfo from "../components/ServiceComponents/SellerInfo";
import ImageGallery from "../components/ServiceComponents/ImageGallery";
import PricingSection from "../components/ServiceComponents/PricingSection";
import AboutGig from "../components/ServiceComponents/AboutGig";
import RelatedServices from "../components/RelatedServices";
import ReviewSection from "../components/ReviewsList";
import FaqTab from "../components/ServiceComponents/FaqTab";

import serviceData from "../data";

const ServicePage = () => {
  const [selectedPackage, setSelectedPackage] = useState("standard");
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleImageClick = (index) => {
    setImageIndex(index);
  };

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const hiddenElements = document.querySelectorAll(
      ".service-card, .blog-cards"
    );
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* <Navigation /> */}
      <div className="service-page">
        <div className="service-container">


          <div className="page-layout">
            {/* Left Column - Content Section */}
            <div className="content-section">

              <h1 className="mb-6">{serviceData.title}</h1>

              <SellerInfo seller={serviceData.seller} />

              <div className="mb-10">
                <ImageGallery
                  images={serviceData.images}
                  imageIndex={imageIndex}
                  onImageClick={handleImageClick}
                />
              </div>



              <div className="mobile-pricing-section">
                <PricingSection
                  selectedPackage={selectedPackage}
                  onPackageSelect={handlePackageSelect}
                  price={serviceData.price}
                  features={serviceData.features}
                />
              </div>


              {/* About Gig section */}
              <div className="tab-content">
                <AboutGig />
              </div>


              {/* Related Services Section */}
              <div>
                <RelatedServices
                  serviceData={serviceData}
                />
              </div>

              {/* Review Section */}
              <div>
                <ReviewSection />
              </div>

              <div>
                <FaqTab faqs={serviceData.faqs} />
              </div>
            </div>

            {/* Right Column - Pricing Section */}
            <div className="pricing-section desktop-pricing-section">
              <PricingSection
                selectedPackage={selectedPackage}
                onPackageSelect={handlePackageSelect}
                price={serviceData.price}
                features={serviceData.features}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;
