import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Play, Pause, Volume2, VolumeOff, Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Testimonials.css";

const Testimonials = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});

  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, Tech Solutions",
      text: "Akamify transformed our e-commerce business with their automation solutions. Highly recommended!",
      media: {
        type: "video",
        url: "/testimonial1.mp4",
        thumbnail: "/testimonial1-thumb.jpg"
      }
    },
    {
      name: "Jane Smith", 
      role: "Marketing Director, Retail Corp",
      text: "Outstanding customer support and innovative solutions. They truly understand our business needs.",
      media: {
        type: "image",
        url: "/testimonial2.jpg"
      }
    },
    {
      name: "Mike Johnson",
      role: "Founder, Startup Inc", 
      text: "The automation tools have saved us countless hours and increased our conversion rates significantly.",
      media: {
        type: "video",
        url: "/testimonial3.mp4", 
        thumbnail: "/testimonial3-thumb.jpg"
      }
    },
  ];

  const handleVideoClick = (index) => {
    const videoElement = videoRefs.current[index];
    if (!videoElement) return;

    if (playingVideo === index) {
      videoElement.pause();
      setPlayingVideo(null);
    } else {
      // Pause any currently playing video
      if (playingVideo !== null && videoRefs.current[playingVideo]) {
        videoRefs.current[playingVideo].pause();
      }
      
      const playVideo = (index) => {
        if (videoRefs.current[index]) {
          videoRefs.current[index].play()
            .then(() => {
              setPlayingVideo(index);
            })
            .catch(() => {});
        }
      };

      playVideo(index);
    }
  };

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
          autoplay={{ delay: 5000, disableOnInteraction: false }}
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
                <div className="testimonial-media">
                  {testimonial.media.type === "video" ? (
                    <>
                      <video
                        ref={el => videoRefs.current[index] = el}
                        src={testimonial.media.url}
                        poster={testimonial.media.thumbnail}
                        onClick={() => handleVideoClick(index)}
                        loop
                        playsInline
                        autoplay
                        muted
                        className="testimonial-video"
                      />
                      <div className={`video-overlay ${playingVideo === index ? 'hidden' : ''}`} onClick={() => handleVideoClick(index)}>
                        <div className="play-icon">
                          {/* <Play size={24} color="#fff" /> */}
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={testimonial.media.url}
                      alt={`${testimonial.name} testimonial`}
                      className="testimonial-image"
                    />
                  )}
                </div>
                
                <div className="testimonial-content">
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="quote-icon">
                    <Quote size={24} color="#d1d5db" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
