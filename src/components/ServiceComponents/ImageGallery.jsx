import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FullScreenImageViewer from "./FullScreenImageViewer";
import "./ImageGallery.css";

const ImageGallery = ({ images, imageIndex, onImageClick }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenIndex, setFullScreenIndex] = useState(0);

  const handlePrevClick = () => {
    const newIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
    onImageClick(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = imageIndex === images.length - 1 ? 0 : imageIndex + 1;
    onImageClick(newIndex);
  };

  const openFullScreen = (index) => {
    setFullScreenIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const handleFullScreenPrev = () => {
    setFullScreenIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleFullScreenNext = () => {
    setFullScreenIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="service-images">
        <div className="main-image">
          <img
            src={images[imageIndex]}
            alt="Service preview"
            onClick={() => openFullScreen(imageIndex)}
            className="clickable-image"
          />
          <button className="nav-button prev-button" onClick={handlePrevClick}>
            <ChevronLeft size={24} />
          </button>
          <button className="nav-button next-button" onClick={handleNextClick}>
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="thumbnail-images">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Service preview ${index + 1}`}
              className={index === imageIndex ? "active" : ""}
              onClick={() => {
                onImageClick(index);
                // Also open fullscreen when clicking thumbnails
                // openFullScreen(index);
              }}
            />
          ))}
        </div>
      </div>

      {isFullScreen && (
        <FullScreenImageViewer
          images={images}
          currentIndex={fullScreenIndex}
          onClose={closeFullScreen}
          onNext={handleFullScreenNext}
          onPrev={handleFullScreenPrev}
        />
      )}
    </>
  );
};

export default ImageGallery;
