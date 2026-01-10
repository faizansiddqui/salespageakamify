import React, { useState } from 'react';
import { ExternalLink, Eye, ShoppingCart, Users, MessageSquare, Grid, Store, HeadphonesIcon } from 'lucide-react';
import './ViewDemo.css';

const ViewDemo = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const demoCards = [
    {
      id: 1,
      title: 'E-commerce Home Page',
      description: 'Modern and responsive homepage with product showcases, featured collections, and seamless navigation. Includes hero banners, trending products, and customer testimonials.',
      image: '/demo/ecommerce-home.jpg',
      icon: <ShoppingCart size={24} />,
      features: ['Hero Banner', 'Product Grid', 'Search & Filter', 'Shopping Cart', 'User Reviews'],
      liveUrl: '#'
    },
    {
      id: 2,
      title: 'Admin Dashboard',
      description: 'Comprehensive admin panel for managing products, orders, customers, and analytics. Real-time data visualization and intuitive controls.',
      image: '/demo/admin-dashboard.jpg',
      icon: <Grid size={24} />,
      features: ['Order Management', 'Product Control', 'Analytics Dashboard', 'User Management', 'Settings'],
      liveUrl: '#'
    },
    {
      id: 3,
      title: 'Category Page',
      description: 'Dynamic category browsing with advanced filtering, sorting options, and grid/list view toggle. Optimized for conversion and user experience.',
      image: '/demo/category-page.jpg',
      icon: <Store size={24} />,
      features: ['Product Filtering', 'Price Range', 'Brand Filter', 'Sort Options', 'Quick View'],
      liveUrl: '#'
    },
    {
      id: 4,
      title: 'Contact Page',
      description: 'Professional contact page with interactive forms, location maps, and multiple contact channels. Integrated with customer support system.',
      image: '/demo/contact-page.jpg',
      icon: <MessageSquare size={24} />,
      features: ['Contact Form', 'Location Map', 'Live Chat', 'FAQ Section', 'Social Links'],
      liveUrl: '#'
    },
     {
      id: 5,
      title: 'Contact Page',
      description: 'Professional contact page with interactive forms, location maps, and multiple contact channels. Integrated with customer support system.',
      image: '/demo/contact-page.jpg',
      icon: <MessageSquare size={24} />,
      features: ['Contact Form', 'Location Map', 'Live Chat', 'FAQ Section', 'Social Links'],
      liveUrl: '#'
    },
     {
      id: 6,
      title: 'Contact Page',
      description: 'Professional contact page with interactive forms, location maps, and multiple contact channels. Integrated with customer support system.',
      image: '/demo/contact-page.jpg',
      icon: <MessageSquare size={24} />,
      features: ['Contact Form', 'Location Map', 'Live Chat', 'FAQ Section', 'Social Links'],
      liveUrl: '#'
    }
  ];

  return (
    <div className="view-demo-page">
      <div className="demo-container">
        <div className="demo-header">
          <h1>Live Demo Showcase</h1>
          <p>Explore our comprehensive e-commerce platform with interactive demos</p>
        </div>

        <div className="demo-grid">
          {demoCards.map((card) => (
            <div
              key={card.id}
              className={`demo-card ${hoveredCard === card.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-image-container">
                <div className="card-icon">
                  {card.icon}
                </div>
                <img 
                  src={card.image} 
                  alt={card.title}
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/seed/${card.title}/400/250.jpg`;
                  }}
                />
                <div className="image-overlay">
                  <Eye size={20} />
                  <span>Preview</span>
                </div>
              </div>

              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>

                <div className="card-features">
                  <h4>Key Features:</h4>
                  <div className="features-list">
                    {card.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  className="view-live-btn"
                  onClick={() => window.open(card.liveUrl, '_blank')}
                >
                  <ExternalLink size={16} />
                  View Live Demo
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="demo-info-section">
          <div className="info-card">
            <h3>Why Choose Our Platform?</h3>
            <div className="info-grid">
              <div className="info-item">
                <Users size={32} />
                <h4>User-Friendly</h4>
                <p>Intuitive interface designed for maximum conversion</p>
              </div>
              <div className="info-item">
                <ShoppingCart size={32} />
                <h4>Complete E-commerce</h4>
                <p>Full-featured solution from catalog to checkout</p>
              </div>
              <div className="info-item">
                <HeadphonesIcon size={32} />
                <h4>24/7 Support</h4>
                <p>Dedicated support team always ready to help</p>
              </div>
              <div className="info-item">
                <Grid size={32} />
                <h4>Responsive Design</h4>
                <p>Perfect experience on all devices and screen sizes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDemo;
