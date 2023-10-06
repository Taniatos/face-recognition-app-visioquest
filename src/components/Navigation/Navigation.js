import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, route }) => {
  if (route === "home") {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("landing")}
          className="f4 link dim black underline-hover pa3 pointer"
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      // <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      //   <p
      //     onClick={() => onRouteChange("signin")}
      //     className="f4 link dim black underline-hover pa3 pointer"
      //   >
      //     Sign in
      //   </p>
      //   <p
      //     onClick={() => onRouteChange("register")}
      //     className="f4 link dim black underline-hover pa3 pointer"
      //   >
      //     Register
      //   </p>
      // </nav>
      null
    );
  }
};

export default Navigation;
