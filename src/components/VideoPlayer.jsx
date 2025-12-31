import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeOff, Maximize, Minimize } from "lucide-react";
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

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!document.fullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
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
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="mute-btn" onClick={toggleMute}>
              {isMuted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
            </button>
            <button className="fullscreen-btn" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
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
