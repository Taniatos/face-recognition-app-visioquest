import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes, isLoading, imageRef, onImageLoad, onImageError }) => {
  return (
    <div className="ma">
      <div className="relative mt2 img-box">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loader"></div>
            <p>Summoning pixels from the void...</p>
          </div>
        )}
        {imageUrl && (
          <img
            ref={imageRef}
            crossOrigin="anonymous"
            src={imageUrl}
            alt="Face detection target"
            className="input-image-style"
            onLoad={onImageLoad}
            onError={onImageError}
          />
        )}
        {boxes.map((box, i) => (
          <div
            key={i}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
