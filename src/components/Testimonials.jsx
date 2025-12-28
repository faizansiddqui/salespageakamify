import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, Tech Solutions",
      text: "Akamify transformed our e-commerce business with their automation solutions. Highly recommended!",
      avatar: "/avatar1.png",
    },
    {
      name: "Jane Smith",
      role: "Marketing Director, Retail Corp",
      text: "Outstanding customer support and innovative solutions. They truly understand our business needs.",
      avatar: "/avatar2.png",
    },
    {
      name: "Mike Johnson",
      role: "Founder, Startup Inc",
      text: "The automation tools have saved us countless hours and increased our conversion rates significantly.",
      avatar: "/avatar3.png",
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-heading">Customers love us!</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="testimonial-slide">
              <div className="testimonial-card">
                <div className="avatar-placeholder">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="avatar-image"
                  />
                </div>
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-role">{testimonial.role}</p>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
