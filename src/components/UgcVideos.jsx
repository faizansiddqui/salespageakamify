import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import './UgcVideos.css';

const UgcVideos = ({ videos = [] }) => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});
  const containerRef = useRef(null);

  useEffect(() => {
    // Clean up when component unmounts
    return () => {
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          video.pause();
        }
      });
    };
  }, []);

  const handleVideoClick = (index) => {
    const videoElement = videoRefs.current[index];
    if (!videoElement) return;

    if (playingVideo === index) {
      // Pause the currently playing video
      videoElement.pause();
      setPlayingVideo(null);
    } else {
      // Pause any currently playing video
      if (playingVideo !== null && videoRefs.current[playingVideo]) {
        videoRefs.current[playingVideo].pause();
      }
      
      // Play the clicked video
      videoElement.play()
        .then(() => {
          setPlayingVideo(index);
        })
        .catch(e => console.log("Autoplay prevented:", e));
    }
  };

  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: -900, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: 900, behavior: 'smooth' });
    }
  };


  return (
    <section className="ugc-videos-section">
      <h2 className="section-title">User Generated Content</h2>
      <div className="ugc-videos-wrapper">
          <ChevronLeft size={70} onClick={scrollLeft} />
        <div className="ugc-videos-container" ref={containerRef}>
          {videos.map((video, index) => (
            <div key={video.id} className="ugc-video-card">
              <div className="video-content">
                <video
                  ref={el => videoRefs.current[index] = el}
                  id={`video-${index}`}
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  onClick={() => handleVideoClick(index)}
                  loop
                  playsInline
                  // muted // Add muted attribute for better autoplay compatibility
                />
                
                {/* Video play overlay with play icon */}
                <div className={`video-play-overlay ${playingVideo === index ? 'hidden' : ''}`} onClick={() => handleVideoClick(index)}>
                  <div className="ugc-play-icon"></div>
                </div>
                
                <div className="video-text-overlay">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-creator">By {video.creator}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
          <ChevronRight size={70} onClick={scrollRight} />
      </div>
    </section>
  );
};

export default UgcVideos;