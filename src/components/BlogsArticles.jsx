import React from "react";
import "./BlogsArticles.css";

const BlogsArticles = () => {
  return (
    <section className="blogs-articles-section">
      <div className="blogs-articles-container">
        <h2 className="blogs-articles-heading">
          Blogs <span className="highlight">&</span> Articles!
        </h2>
        <div className="blogs-grid">
          <div className="blog-card left-card">
            <div className="blog-content">
              <div className="blog-text">
                <div className="tag">
                  <div className="tag-icon"></div>
                  <div>#1 E-Commerce Solution Provider</div>
                </div>
                <p className="description">
                  Discover how our innovative solutions can transform your
                  e-commerce business and boost your revenue.
                </p>
              </div>
              <button className="blog-btn-left">View More</button>
            </div>
          </div>
          <div className="blog-card right-card">
            <div className="blog-content">
              <div className="blog-text">
                <div className="tag">
                  <div className="tag-icon"></div>
                  <div>About Akamify</div>
                </div>
                <p className="description">
                  Learn more about our journey, mission, and the team behind
                  Akamify's success in e-commerce solutions.
                </p>
              </div>
              <button className="blog-btn-right">View more</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsArticles;
