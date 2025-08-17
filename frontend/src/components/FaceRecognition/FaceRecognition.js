import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="ma">
      <div className="relative mt2 img-box">
        <img
          id="inputImage"
          src={imageUrl}
          alt=""
          className="input-image-style"
        />
        {box && box.topRow && (
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;