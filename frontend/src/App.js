import React, { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import SecondPage from "./pages/SecondPage/SecondPage"; 

function App() {
  const [route, setRoute] = useState("landing");

  const onRouteChange = (route) => {
    setRoute(route);
  };

  return (
    <div className="App">
      {route === "landing" ? (
        <LandingPage onRouteChange={onRouteChange} />
      ) : (
        <SecondPage />
      )}
    </div>
  );
}

export default App;
