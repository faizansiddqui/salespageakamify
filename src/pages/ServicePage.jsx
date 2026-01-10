import React, { useState, useEffect } from "react";
import serviceData from "../data";
// import Navigation from "../components/Navigation";
import Breadcrumb from "../components/ServiceComponents/Breadcrumb";
import SellerInfo from "../components/ServiceComponents/SellerInfo";
import ImageGallery from "../components/ServiceComponents/ImageGallery";
import Tabs from "../components/ServiceComponents/Tabs";
import DescriptionTab from "../components/ServiceComponents/DescriptionTab";
import FaqTab from "../components/ServiceComponents/FaqTab";
import ReviewsTab from "../components/ServiceComponents/ReviewsTab";
import PricingSection from "../components/ServiceComponents/PricingSection";
import AboutGig from "../components/ServiceComponents/AboutGig";
import { Calendar, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../components/ResponsiveUtils.css";

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

          {/* <Breadcrumb /> */}

          <div className="page-layout">
            {/* Left Column - Content Section */}
            <div className="content-section">
              <h1>{serviceData.title}</h1>

              <SellerInfo seller={serviceData.seller} />

              <ImageGallery
                images={serviceData.images}
                imageIndex={imageIndex}
                onImageClick={handleImageClick}
              />

              {/* Pricing section moved here for mobile view */}
              <div className="mobile-pricing-section">
                <PricingSection
                  selectedPackage={selectedPackage}
                  onPackageSelect={handlePackageSelect}
                  price={serviceData.price}
                  features={serviceData.features}
                />
              </div>

              {/* <Tabs activeTab={activeTab} onTabChange={handleTabChange} */}

              <div className="tab-content">
                <h2>About Gig</h2>
                <AboutGig />
              </div>

              {/* Related Services Section */}
              <div className="related-services-section">
                <h2>Related Services</h2>
                <div className="services-grid">
                  {serviceData.relatedServices.map((service) => (
                    <div key={service.id} className="service-card">
                      <img src={service.image} alt={service.title} />
                      <div className="service-card-content">
                        <h3>{service.title}</h3>
                        <div className="service-price">
                          ₹{service.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blog Section */}
              <div className="blog-section">
                <h2>Related Blog Posts</h2>
                <div className="blogs-container">
                  {serviceData.blogs.map((blog) => (
                    <div key={blog.id} className="blog-cards">
                      <img src={blog.image} alt={blog.title} />
                      <div className="blog-cards-content">
                        <h3>{blog.title}</h3>
                        <p className="blog-excerpt">{blog.excerpt}</p>
                        <div className="blog-meta">
                          <span className="blog-author">By {blog.author}</span>
                          <span className="blog-date">{blog.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <FaqTab faqs={serviceData.faqs} />
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
