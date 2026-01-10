import React from "react";
import { Calendar, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AboutGig.css";

const AboutGig = () => {
  const navigate = useNavigate();

  const handleBookEnrollment = () => {
    navigate('/book-enrollment');
  };

  const handleViewDemo = () => {
    navigate('/view-demo');
  };

  return (
    <div className="about-gig-content">
      <p>
        I will design and develop a professional eCommerce website that is fast,
        secure, SEO-friendly, <br /> <br /> and fully responsive on all devices.
        From simple online stores to advanced multi-vendor marketplaces, I help
        businesses increase sales with smart features, clean design, and
        easy-to-use admin panels.
      </p>
      <p>
        <br />I offer complete multi-vendor marketplace development where
        multiple sellers can register and sell their products, with vendor
        dashboards, shipping integration, WhatsApp marketing tools, bulk message
        campaigns, AI chatbot or sales agent, advanced analytics, customer
        profiling, retargeting systems, and automation for returning customers.
        My goal is to deliver a scalable, user-friendly, and sales-focused
        eCommerce solution that helps your business grow online.
      </p>

      <div className="yqg">
        <div className="website-type">
          <p>
            {" "}
            <b>Website type</b>
          </p>
          <p>E-Commerce store</p>
        </div>
        <div className="website-type">
          <p>
            {" "}
            <b>Website features</b></p>
          <p>
            Marketing, Payment, Shipping, Inventory, Analytics, ChatBot,
            Booking, Dashboard, Blog, and Admin Panel.
          </p>
        </div>
      </div>

      <div className="policy-note">
        <h3>Respect third-party rights</h3>
        <p>
          Please be aware that it is against Fiverr's policies for sellers to
          include themes, templates, or any other elements that infringe
          third-party rights or applicable laws in the delivered work. Read more
          about in our <span className="policy-span">Guide to Responsible Digital Creation</span>.
        </p>
      </div>

      <div className="seller-profile">
        <h3>Get to know Akamify</h3>
        <div className="profile-info">
          <div className="profile-details">
            <img src="/akamify.png" alt="Logo" />
            <p>
              <span className="sqt">Akamify</span>
            </p>
          </div>
          <div className="profile-buttons">
            <button className="profile-button" onClick={handleBookEnrollment}>
              <Calendar />
              Book Enrollment
            </button>
            <button className="profile-button" onClick={handleViewDemo}>
              <Eye />
              View Demo
            </button>
          </div>
        </div>
        <div className="about">
          <div className="hgt">
            <div>
              <p>
                From <br /> <span className="sqt">India</span>{" "}
              </p>
              <p>
                Avg. response time <br /> <span className="sqt">4 hours</span>{" "}
              </p>
            </div>
            <div>
              <p>
                Member since <br /> <span className="sqt">Jun 2024</span>{" "}
              </p>
              <p>
                Languages: <br />{" "}
                <span className="sqt">Hindi, English, Abkhazian, Bihari</span>{" "}
              </p>
            </div>
          </div>
          <p>
            At Akamify, we help growing brands build a strong and professional
            digital presence. We offer website development, mobile app
            development, custom software solutions, e-commerce development, and
            digital growth support to help businesses move forward with
            confidence. Our websites and apps are easy to use, modern, and
            designed to work smoothly on all devices. We help brands sell
            online, manage their business better, and connect with more
            customers through smart digital solutions.
          </p>
        </div>
      </div>

      <div className="package-comparison">
        <h3>Compare packages</h3>
        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>
                <span className="table-price">
                  {" "}
                  <b> ₹22,770 </b>
                </span>
                <br />
                <br />
                <b>Basic</b>
                <br />
                E-commerce Starter
                <p>
                  {" "}
                  A clean, responsive online store to get you selling fast.
                </p>
              </th>
              <th>
                <span className="table-price">
                  {" "}
                  <b> ₹37,950 </b>
                </span>
                <br />
                <br />
                <b>Standard</b>
                <br />
                E-commerce Standard
                <p>
                  All Starter features + progressive web app and conversion
                  tools to grow sales.
                </p>
              </th>
              <th>
                <span className="table-price">
                  {" "}
                  <b> ₹151,800</b>{" "}
                </span>
                <br />
                <br />
                <b>Premium</b>
                <br />
                Pro Multi-Vendor Marketplace
                <p>
                  Full multi-seller marketplace with marketing and automation
                  tools for scaling.
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Functional website</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Content upload</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>E-commerce functionality</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Payment Integration</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Opt-in form</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Autoresponder integration</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Speed optimization</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Hosting setup</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Social media icons</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Number of pages</td>
              <td>8</td>
              <td>10</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Plugins/extensions installation</td>
              <td>2</td>
              <td>4</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Number of products</td>
              <td>20</td>
              <td>40</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Revisions</td>
              <td>1</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Delivery Time</td>
              <td>4 days</td>
              <td>10 days</td>
              <td>30 days</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>₹22,770</td>
              <td>₹37,950</td>
              <td>₹151,800</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutGig;
