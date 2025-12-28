import React, { useState, useRef, useEffect } from 'react';
// import { FaHeart, FaComment } from 'react-icons/fa';
import './UgcVideos.css';

const UgcVideos = ({ videos = [] }) => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});

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


  return (
    <section className="ugc-videos-section">
      <h2 className="section-title">User Generated Content</h2>
      <div className="ugc-videos-container">
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
              <div className="video-overlay">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-creator">By {video.creator}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UgcVideos;