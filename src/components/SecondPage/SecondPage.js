import React, { useState, useEffect, useCallback } from "react";
import "./SecondPage.css";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import InputForm from "../InputForm/InputForm";
import { pat } from "../../constants/apiKeys";


const SecondPage = () => {
  const [input, setInput] = useState("");
  const [box, setBox] = useState({});
  const [isSuggestionClick, setIsSuggestionClick] = useState(false);

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


  const submitImage = async () => {
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

    try {
      const response = await fetch(
        `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
        requestOptions
      );
      const data = await response.json();
      displayFaceBox(calculateFaceLocation(data));
    } catch (error) {
      console.log("error", error);
    }
  };


  const memoizedSubmitImage = useCallback(submitImage, [input]);

  useEffect(() => {
    if (input && isSuggestionClick) {
      memoizedSubmitImage();
    }
  }, [input, isSuggestionClick, memoizedSubmitImage]);

  const onInputChange = (event) => {
    setInput(event.target.value);
    setIsSuggestionClick(false); 
  };

  const handleSuggestionClick = (imageUrl) => {
    setInput(imageUrl);
    setIsSuggestionClick(true); 
  };

  return (
    <section className="app-page">
      <div className="second-page-content-box">
        <div className="content-left">
          <InputForm
            onInputChange={onInputChange}
            onButtonSubmit={(event) => {
              event.preventDefault();
              memoizedSubmitImage();
            }}
          />
          <FaceRecognition imageUrl={input} box={box} />
        </div>
        <div className="content-right">
          <h3>To try out VisioQuest, follow these simple steps:</h3>
          <div className="steps">
            <ul>
              <li>
                <div className="step-style">Step 1</div> Copy image address on
                any website
              </li>
              <li>
                <span className="step-style">Step 2</span> Paste it into the
                search field and press the button
              </li>
              <li>
                <span className="step-style">Step 3</span> Enjoy!
              </li>
            </ul>
            <div className="suggestions-div">
              <h4>No time to look for URLs? These are for you:</h4>
              <div className="suggestions-box">
                {/* ONE */}
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://images.pexels.com/photos/20087472/pexels-photo-20087472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    )
                  }
                >
                  1
                </div>
                {/* TWO */}
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                    )
                  }
                >
                  2
                </div>
                {/* THREE */}
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://images.pexels.com/photos/17403707/pexels-photo-17403707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    )
                  }
                >
                  3
                </div>
                {/* FOUR */}
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://media.istockphoto.com/id/1333405308/photo/positive-woman-video-calling-using-laptop-at-home.jpg?s=612x612&w=0&k=20&c=0uH6FbjIvWaxW-tdCZltqbGBlAZuQnVlgr6joXsJxUc="
                    )
                  }
                >
                  4
                </div>
                {/* FIVE */}
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://images.pexels.com/photos/19402529/pexels-photo-19402529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    )
                  }
                >
                  5
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondPage;
