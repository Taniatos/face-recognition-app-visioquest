import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import pictureLogo from "./pictureLogo.png";

const Logo = () => {
  return (
    <div className="ma4 mt0 logo">
      <Tilt>
        <div className="tilt">
          <img src={pictureLogo} alt="Logo" width="60px" />
        </div>
      </Tilt>
      <h1 className="appName">VisioQuest App</h1>
    </div>
  );
};
export default Logo;
