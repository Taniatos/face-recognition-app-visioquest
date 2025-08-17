import React, { useState, useEffect } from "react";
import "./LandingPage.css";

const LandingPage = ({ onRouteChange }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderTitle = () => {
    return windowWidth <= 540 ? (
      <>
        <span>Visio</span>
        <br />
        <span>Quest</span>
      </>
    ) : (
      "VisioQuest"
    );
  };

  return (
    <>
      <div className="container">
        <div className="landing-content">
          <div className="content-box">
            <h2 className="landing-h2">Welcome to Face Recognition App</h2>
            <h1 className="landing-h1">{renderTitle()}</h1>
            <button
              onClick={() => onRouteChange("secondPage")}
              className="btn-start"
            >
              START
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
