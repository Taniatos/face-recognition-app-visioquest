import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes, isLoading }) => {
  return (
    <div className="ma">
      <div className="relative mt2 img-box">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loader"></div>
            <p>Waking up the server, please wait...</p>
             <p>The subsequent requests will be instant.</p>
          </div>
        )}
        <img
          id="inputImage"
          src={imageUrl}
          alt=""
          className="input-image-style"
        />
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