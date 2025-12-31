import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!document.fullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const changePlaybackRate = (rate) => {
    const video = videoRef.current;
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const handleProgress = () => {
    const video = videoRef.current;
    const currentTime = video.currentTime;
    const duration = video.duration;
    const percentage = (currentTime / duration) * 100;

    setCurrentTime(currentTime);
    setDuration(duration);
    setProgress(percentage);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("timeupdate", handleProgress);
    video.addEventListener("loadedmetadata", handleProgress);
    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("pause", () => setIsPlaying(false));
    video.addEventListener("volumechange", () => setIsMuted(video.muted));

    return () => {
      video.removeEventListener("timeupdate", handleProgress);
      video.removeEventListener("loadedmetadata", handleProgress);
      video.removeEventListener("play", () => setIsPlaying(true));
      video.removeEventListener("pause", () => setIsPlaying(false));
      video.removeEventListener("volumechange", () => setIsMuted(video.muted));
    };
  }, []);

  return (
    <div className="video-player-container">
      <div className="video-container">
        <video
          ref={videoRef}
          className="video-element"
          poster="/img1 (1).png" // Optional poster image
          preload="metadata"
          onLoadedMetadata={handleProgress}
          onTimeUpdate={handleProgress}
          onClick={handleVideoClick}
          onError={() => console.error("Video failed to load")}
        >
          <source src="./Akamify.mp4" type="video/mp4" />
          <source
            src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Video overlay with play icon */}
        <div className={`video-overlay ${isPlaying ? 'hidden' : ''}`} onClick={handleVideoClick}>
          <div className="play-icon"></div>
        </div>
        
        <div className="video-controls">
          <div className="progress-container" onClick={handleSeek}>
            <div className="progress-bar" ref={progressBarRef}>
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <div className="control-buttons">
            <button className="play-pause-btn" onClick={togglePlayPause}>
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <button className="mute-btn" onClick={toggleMute}>
              {isMuted ? "🔇" : "🔊"}
            </button>
            <button className="fullscreen-btn" onClick={toggleFullscreen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
            <div className="playback-rate-selector">
              <select
                value={playbackRate}
                onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
            <span className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
