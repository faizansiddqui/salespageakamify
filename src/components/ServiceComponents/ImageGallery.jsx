/**
 * ✅ BEST UPLOAD SIZE: 1280x720 (16:9 Ratio)
 * Is size se Fiverr gig gallery mein media blkl fit baithta hai aur side spaces nahi aate.
 */

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { IoPlayCircleSharp, IoPauseCircleSharp } from "react-icons/io5";
import { MdFullscreen } from "react-icons/md";
import { FreeMode, Thumbs } from "swiper/modules";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import FullScreenImageViewer from "./FullScreenImageViewer";

// ✅ Hook import
import useSoundEngine from "../../hooks/useSoundEngine";

const isVideo = (src = "") => {
  const clean = (src || "").split("?")[0].toLowerCase();
  return (
    clean.endsWith(".mp4") ||
    clean.endsWith(".webm") ||
    clean.endsWith(".ogg") ||
    clean.endsWith(".mov") ||
    clean.endsWith(".m4v")
  );
};

const ImageGallery = ({ images = [], imageIndex = 0, onImageClick = () => { } }) => {
  const mainSwiperRef = useRef(null);
  const videoRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(Number.isFinite(imageIndex) ? imageIndex : 0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenIndex, setFullScreenIndex] = useState(0);

  // ✅ Thumbnail frame setting (e.g., 26th second)
  const videoThumbTime = 1;

  useEffect(() => {
    const handler = (e) => setFullScreenIndex(e.detail);
    window.addEventListener("fullscreen:thumbClick", handler);
    return () => window.removeEventListener("fullscreen:thumbClick", handler);
  }, []);

  const { unlock, playClick, tickOnce, markMoving } = useSoundEngine({
    clickUrl: "/sound/clickSound.MP3",
    tickUrl: "/sound/iosClickScrollSound2Fremes.MP3",
    clickVolume: 0.7,
    tickVolume: 0.7,
  });

  useEffect(() => {
    if (!images.length) return;
    const idx = Math.max(0, Math.min(imageIndex || 0, images.length - 1));
    setActiveIndex(idx);
    if (mainSwiperRef.current?.slideTo) mainSwiperRef.current.slideTo(idx);
    if (thumbsSwiper?.slideTo) thumbsSwiper.slideTo(idx);
  }, [imageIndex, images, thumbsSwiper]);

  const handleSlideChange = (swiper) => {
    const idx = swiper.realIndex;
    setActiveIndex(idx);
    onImageClick(idx);
    tickOnce();
    thumbsSwiper?.slideTo?.(idx);

    // Stop video if we slide to an image
    if (!isVideo(images[idx]) && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleNextClick = () => {
    playClick();
    if (activeIndex === images.length - 1) mainSwiperRef.current.slideTo(0);
    else mainSwiperRef.current.slideNext();
  };

  const handlePrevClick = () => {
    playClick();
    if (activeIndex === 0) mainSwiperRef.current.slideTo(images.length - 1);
    else mainSwiperRef.current.slidePrev();
  };

  const onThumbClick = (idx) => {
    const isVid = isVideo(images[idx]);

    // ✅ Play/Pause toggle logic when clicking video thumbnail
    if (idx === activeIndex && isVid && videoRef.current) {
      if (videoRef.current.paused) videoRef.current.play();
      else videoRef.current.pause();
      tickOnce();
      return;
    }

    if (mainSwiperRef.current?.slideTo) mainSwiperRef.current.slideTo(idx);
    thumbsSwiper?.slideTo?.(idx);
    tickOnce();
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto" onPointerDown={unlock} onTouchStart={unlock}>
        {/* Main Preview Box - Fixed 16:9 Aspect Ratio */}
        <div className="relative rounded-lg overflow-hidden bg-black group aspect-video">
          <Swiper
            onSwiper={(s) => (mainSwiperRef.current = s)}
            slidesPerView={1}
            speed={400}
            onSlideChange={handleSlideChange}
            initialSlide={activeIndex}
            modules={[Thumbs]}
            thumbs={{ swiper: thumbsSwiper }}
            className="w-full h-full"
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx} className="flex items-center justify-center">
                {isVideo(src) ? (
                  <video
                    ref={videoRef}
                    src={`${src}#t=${videoThumbTime}`}
                    controls
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full h-full object-cover" // ✅ Fit properly without side-space
                  />
                ) : (
                  <img
                    src={src}
                    alt="gig-media"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    onClick={() => openFullScreen(idx)}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Fullscreen Overlay Button */}
          <button
            onClick={() => { playClick(); setIsFullScreen(true); setFullScreenIndex(activeIndex); }}
            className="absolute right-3 top-3 z-30 p-2 rounded-full bg-white/90 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MdFullscreen className="text-2xl text-gray-800" />
          </button>

          {/* Nav Arrows */}
          <button onClick={handlePrevClick} className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 lg:p-3 rounded-xl bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition">
            <HiChevronDoubleLeft className="text-xl lg:text-2xl" />
          </button>
          <button onClick={handleNextClick} className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 lg:p-3 rounded-xl bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition">
            <HiChevronDoubleRight className="text-xl lg:text-2xl" />
          </button>
        </div>

        {/* ✅ Thumbnail Grid - Consistent 16:9 layout */}
        <div className="mt-2">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={"auto"}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="pb-2"
          >
            {images.map((src, idx) => {
              const isActive = idx === activeIndex;
              const video = isVideo(src);
              return (
                <SwiperSlide key={idx} style={{ width: "130px" }}>
                  <div
                    onClick={() => onThumbClick(idx)}
                    className={`relative aspect-video cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-300
                      ${isActive ? "border-blue-500 scale-105 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    {video ? (
                      <>
                        <video
                          src={`${src}#t=${videoThumbTime}`}
                          preload="metadata"
                          muted
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          {/* ✅ Icon logic based on Play/Pause status */}
                          {isActive && isPlaying ? (
                            <IoPauseCircleSharp className="text-white text-4xl drop-shadow-lg animate-pulse" />
                          ) : (
                            <IoPlayCircleSharp className="text-white text-4xl drop-shadow-lg" />
                          )}
                        </div>
                      </>
                    ) : (
                      <img src={src} className="w-full h-full object-cover" alt="thumb" />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullScreen && (
        <FullScreenImageViewer
          images={images}
          currentIndex={fullScreenIndex}
          onClose={() => setIsFullScreen(false)}
          onIndexChange={(idx) => {
            setFullScreenIndex(idx);
            mainSwiperRef.current?.slideTo(idx);
            setActiveIndex(idx);
          }}
        />
      )}
    </>
  );
};

export default ImageGallery;