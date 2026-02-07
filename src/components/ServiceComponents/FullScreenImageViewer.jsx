// FullScreenImageViewer.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { IoMdClose } from "react-icons/io";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";
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

const FullScreenImageViewer = ({
  images = [],
  currentIndex = 0,
  onClose = () => { },
  onIndexChange = () => { },
}) => {
  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);
  const thumbListRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  const videoThumbTime = 1;


  const safeIndex = useMemo(() => {
    if (!images?.length) return 0;
    return Math.max(0, Math.min(currentIndex || 0, images.length - 1));
  }, [currentIndex, images]);

  const { unlock, playClick, tickOnce, markMoving } = useSoundEngine({
    clickUrl: "/sound/clickSound.MP3",
    tickUrl: "/sound/iosClickScrollSound2Fremes.MP3",
    clickVolume: 0.7,
    tickVolume: 0.7,
  });

  // Prevent body scroll while viewer open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "unset";
    };
  }, []);

  // Update active index when safeIndex changes
  useEffect(() => {
    setActiveIndex(safeIndex);
    // sync swipers
    setTimeout(() => {
      mainSwiperRef.current?.slideTo?.(safeIndex, 0);
      thumbsSwiperRef.current?.slideTo?.(safeIndex, 0);
      if (thumbListRef.current) {
        const el = thumbListRef.current.querySelector(`[data-thumb-index="${safeIndex}"]`);
        el?.scrollIntoView?.({ block: "center", behavior: "smooth" });
      }
    }, 0);
  }, [safeIndex]);

  // Attach keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        playClick();
        mainSwiperRef.current?.slidePrev?.();
      }
      if (e.key === "ArrowRight") {
        playClick();
        mainSwiperRef.current?.slideNext?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, playClick]);

  // Attach play/pause listeners to active video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) {
      setIsPlaying(false);
      return;
    }
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    setIsPlaying(!v.paused && !v.ended);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, [activeIndex, images]);

  if (!images?.length) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const pauseCurrentVideo = () => {
    if (videoRef.current && !videoRef.current.paused) {
      try {
        videoRef.current.pause();
      } catch (err) {
        /* ignore autoplay/pause errors */
      }
    }
  };

  const handleMainSlideChange = (swiper) => {
    // Pause any active video before changing
    pauseCurrentVideo();

    const idx = typeof swiper.realIndex === "number" ? swiper.realIndex : swiper.activeIndex;
    setActiveIndex(idx);
    onIndexChange(idx);
    // sync thumbnail lists
    thumbsSwiperRef.current?.slideTo?.(idx);
    if (thumbListRef.current) {
      const el = thumbListRef.current.querySelector(`[data-thumb-index="${idx}"]`);
      el?.scrollIntoView?.({ block: "center", behavior: "smooth" });
    }
    tickOnce();
  };

  const handleThumbClick = (idx) => {
    pauseCurrentVideo();
    mainSwiperRef.current?.slideTo?.(idx);
    thumbsSwiperRef.current?.slideTo?.(idx);
    setActiveIndex(idx);
    onIndexChange(idx);
    if (thumbListRef.current) {
      const el = thumbListRef.current.querySelector(`[data-thumb-index="${idx}"]`);
      el?.scrollIntoView?.({ block: "center", behavior: "smooth" });
    }
    tickOnce();
  };

  const togglePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <div
      className="fixed inset-0 z-[1100] bg-white/100"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Close Button */}
      <button
        aria-label="Close viewer"
        onClick={() => {
          playClick();
          onClose();
        }}
        type="button"
        title="Close"
        className={
          "absolute right-4 top-2 sm:right-5 sm:top-5 md:right-3 md:top-3 z-[1200] " +
          "flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 " +
          "rounded-2xl bg-gradient-to-br from-white/30 to-white/10 border border-black/10 " +
          "backdrop-blur-md shadow-[0_10px_30px_rgba(10,20,40,0.18)] " +
          "transform-gpu hover:scale-105 active:scale-95 focus:outline-none"
        }
        style={{
          transition:
            "transform 240ms cubic-bezier(0.2,0.9,0.2,1), box-shadow 240ms cubic-bezier(0.2,0.9,0.2,1), opacity 200ms ease",
        }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-white/30 to-white/10 opacity-0 hover:opacity-100 transition-opacity" />
        <IoMdClose className="relative z-10 text-[25px] text-black" />
      </button>

      <div
        className="w-full h-full flex flex-col pt-2 sm:pt-8 lg:flex-row lg:items-start lg:justify-center"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={unlock}
        onTouchStart={unlock}
      >
        {/* Desktop thumbnail column (fixed) */}
        <div
          ref={thumbListRef}
          className="hidden lg:flex flex-col w-[130px] gap-3 p-2 overflow-y-auto"
          style={{ height: "calc(100vh - 100px)" }}
        >
          {images.map((src, idx) => {
            const active = idx === activeIndex;
            const video = isVideo(src);
            return (
              <button
                key={idx}
                data-thumb-index={idx}
                type="button"
                onClick={() => handleThumbClick(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`relative w-full rounded-md overflow-hidden transition-transform ${active ? "scale-105 shadow-md" : "hover:scale-[1.02]"}`}
                style={{ aspectRatio: "16/9" }}
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
                      {active && isPlaying ? (
                        <IoPauseCircleSharp className="text-white text-4xl drop-shadow-lg animate-pulse" />
                      ) : (
                        <IoPlayCircleSharp className="text-white text-4xl drop-shadow-lg" />
                      )}
                    </div>
                  </>
                ) : (
                  <img
                    src={src}
                    alt={`thumb-${idx}`}
                    draggable={false}
                    loading="lazy"
                    className="w-full h-full object-cover bg-white"
                  />
                )}
                {active && <span className="absolute inset-0 ring-2 ring-blue-500 ring-offset-1 ring-offset-white rounded-md" />}
              </button>
            );
          })}
        </div>

        {/* Main viewer */}
        <div className="flex-1 lg:mt-0 mt-20 w-full lg:max-w-[calc(100vw-130px)]">
          <div className="w-full rounded-sm overflow-hidden relative flex items-center justify-center">
            <Swiper
              onSwiper={(s) => (mainSwiperRef.current = s)}
              slidesPerView={1}
              initialSlide={safeIndex}
              speed={420}
              onSlideChange={handleMainSlideChange}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="w-full"
            >
              {images.map((src, idx) => {
                const video = isVideo(src);
                return (
                  <SwiperSlide key={idx} className="flex items-center justify-center">
                    {video ? (
                      <div
                        className="relative w-full flex items-center justify-center"
                        style={{
                          maxWidth: "min(1080px, 100vw)",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <video
                          ref={(el) => {
                            // only keep ref for currently active slide
                            if (idx === activeIndex) videoRef.current = el;
                            else if (videoRef.current?.src === el?.src) {
                              // leave as is
                            }
                          }}
                          src={`${src}#t=${videoThumbTime}`}
                          controls
                          playsInline
                          preload="metadata"
                          className="select-none rounded-md cursor-pointer object-contain"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "100vh",
                            maxWidth: "100%",
                          }}
                        />
                      </div>
                    ) : (
                      <img
                        src={src}
                        alt={`Fullscreen ${idx + 1}`}
                        draggable={false}
                        className="w-full object-contain select-none cursor-grab"
                        style={{
                          maxWidth: "min(1120px, 100vw)",
                          maxHeight: "calc(100vh - 10px)",
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Counter */}
          <div className="mt-0 text-center text-xs sm:text-sm text-black/60">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Mobile bottom thumbnails */}
          <div className="w-full px-0 sm:px-2 mt-3 lg:hidden">
            <Swiper
              onSwiper={(s) => (thumbsSwiperRef.current = s)}
              modules={[FreeMode]}
              freeMode={true}
              grabCursor={true}
              watchSlidesProgress={true}
              slidesPerView={"auto"}
              centeredSlides={false}
              spaceBetween={12}
              breakpoints={{
                480: { spaceBetween: 10 },
                640: { spaceBetween: 12 },
                768: { spaceBetween: 16 },
              }}
              className="w-full"
              initialSlide={safeIndex}
              onSetTranslate={(swiper) => {
                const vel = swiper?.touches?.diff ? Math.min(1.2, Math.abs(swiper.touches.diff / 250)) : 0;
                markMoving(vel);
              }}
            >
              {images.map((src, idx) => {
                const active = idx === activeIndex;
                const video = isVideo(src);
                return (
                  <SwiperSlide
                    key={idx}
                    style={{
                      width: "clamp(90px, 28vw, 180px)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleThumbClick(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className={`relative w-full h-20 sm:h-28 rounded-lg overflow-hidden transition-transform ${active ? "scale-105 shadow" : "hover:scale-[1.03]"}`}
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
                            {active && isPlaying ? (
                              <IoPauseCircleSharp className="text-white text-4xl drop-shadow-lg animate-pulse" />
                            ) : (
                              <IoPlayCircleSharp className="text-white text-4xl drop-shadow-lg" />
                            )}
                          </div>
                        </>
                      ) : (
                        <img
                          src={src}
                          alt={`thumb-${idx}`}
                          draggable={false}
                          loading="lazy"
                          className="w-full h-full object-cover bg-white"
                        />
                      )}
                      {active && <span className="absolute inset-0 ring-2 ring-blue-500 ring-offset-1 ring-offset-white rounded-lg" />}
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="mt-2 text-center text-xs sm:text-sm text-black/45">Drag thumbnails to view more</div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default FullScreenImageViewer;
