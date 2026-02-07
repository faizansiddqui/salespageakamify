import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';

const RelatedServices = ({ serviceData }) => {
  const services = serviceData?.relatedServices || [];
  
  // State to track liked services by ID
  const [likedServices, setLikedServices] = useState({});

  const toggleLike = (id) => {
    setLikedServices((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the boolean value for this specific ID
    }));
  };

  return (
    <div className="related-services-section w-full py-12 bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto ">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 px-1">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              More services you might like
            </h2>
            <p className="text-gray-500 mt-1 text-sm md:text-base">Handpicked for your project needs</p>
          </div>
          <button className="text-sm font-bold text-gray-900 hover:text-green-600 transition-all hidden sm:block">
            View All
          </button>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          slidesPerView={1.2}
          spaceBetween={16}
          freeMode={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 2 },
            1024: { slidesPerView: 3.2, spaceBetween: 4 },
            1280: { slidesPerView: 4, spaceBetween: 4 },
          }}
          className="pb-12 !px-1" 
        >
          {services.map((service) => {
            const isLiked = likedServices[service.id];
            
            return (
              <SwiperSlide key={service.id}>
                <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300">
                  
                  {/* Image Container - 16:9 for 1280x720 images */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Interactive Heart Button */}
                    <button 
                      onClick={() => toggleLike(service.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm transition-all duration-300 active:scale-90 z-10"
                    >
                      <Heart 
                        size={18} 
                        className={`transition-colors duration-300 ${
                          isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
                        }`} 
                        fill={isLiked ? "currentColor" : "none"}
                      />
                    </button>
                    
                    {service.isTopRated && (
                      <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                        Bestseller
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col gap-2">
                    
                    {/* Seller Profile */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                        <img src={service.sellerImage || 'https://via.placeholder.com/100'} alt="seller" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 hover:underline cursor-pointer">
                        {service.sellerName || 'Expert Pro'}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-[15px] font-normal text-gray-800 leading-snug line-clamp-2 h-11 group-hover:underline transition-colors">
                      {service.title}
                    </h3>

                    {/* Rating Section */}
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-gray-900 font-bold">5.0</span>
                      <span className="text-gray-400 font-normal">(1k+)</span>
                    </div>

                    {/* Pricing Footer */}
                    <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="text-gray-500 text-[12px] font-bold">
                        From <span className="text-lg text-gray-900 ml-1">₹{service.price.toLocaleString()}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Modern Dots Styling */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #222325 !important;
          width: 12px !important;
          border-radius: 6px !important;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default RelatedServices;