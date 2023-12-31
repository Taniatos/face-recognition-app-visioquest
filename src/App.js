import React, { useState } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
import LandingPage from "./components/LandingPage/LandingPage";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import InputForm from "./components/InputForm/InputForm";
import { pat } from "./constants/apiKeys";

function App() {
  const [input, setInput] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("landing");

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onButtonSubmit = () => {
    const PAT = pat;
    const USER_ID = "taniatos";
    const APP_ID = "visio-quest-app";
    const MODEL_ID = "face-detection";

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: input,
              },
            },
          },
        ],
      }),
    };

    fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        displayFaceBox(calculateFaceLocation(data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" num={80} bg={true} />
      {route === "landing" ? (
        <LandingPage onRouteChange={setRoute} />
      ) : (
        <>
          <Logo />
          <InputForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={input} box={box} />
        </>
      )}
    </div>
  );
}

export default App;
