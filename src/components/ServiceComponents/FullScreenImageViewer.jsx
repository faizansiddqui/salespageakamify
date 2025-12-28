import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./FullScreenImageViewer.css";

const FullScreenImageViewer = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowLeft") {
      onPrev();
    } else if (e.key === "ArrowRight") {
      onNext();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fullscreen-viewer-backdrop" onClick={handleBackdropClick}>
      <button className="fullscreen-close-button" onClick={onClose}>
        <X size={24} />
      </button>

      <button className="fullscreen-nav-button prev" onClick={onPrev}>
        <ChevronLeft size={32} />
      </button>

      <button className="fullscreen-nav-button next" onClick={onNext}>
        <ChevronRight size={32} />
      </button>

      <div className="fullscreen-image-container">
        <img
          src={images[currentIndex]}
          alt={`Fullscreen view ${currentIndex + 1}`}
          className="fullscreen-image"
        />
        <div className="fullscreen-image-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default FullScreenImageViewer;
