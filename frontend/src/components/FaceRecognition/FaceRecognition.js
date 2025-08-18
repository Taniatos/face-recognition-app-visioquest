import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="ma">
      <div className="relative mt2 img-box">
        <img
          id="inputImage"
          src={imageUrl}
          alt=""
          className="input-image-style"
        />
        {/* Map over the boxes array and render a div for each face box */}
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