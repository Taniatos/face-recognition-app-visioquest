import React, { useState, useEffect } from "react";
import "./SecondPage.css";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import InputForm from "../InputForm/InputForm";
import { pat } from "../../constants/apiKeys";

const SecondPage = () => {
  const [input, setInput] = useState("");
  const [box, setBox] = useState({});
  const [isSuggestionClick, setIsSuggestionClick] = useState(false);

  useEffect(() => {
    if (input && isSuggestionClick) {
      submitImage();
    }
  }, [input, isSuggestionClick]);

  const onInputChange = (event) => {
    setInput(event.target.value);
    setIsSuggestionClick(false); 
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
              submitImage();
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
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://img.freepik.com/free-photo/happy-african-american-woman-with-earphones-running-park_637285-4471.jpg?w=1380&t=st=1707010752~exp=1707011352~hmac=2d23c34ae315596fa89f9f4683f99f368f5d359eddb2e7a730877e296ae7a58d"
                    )
                  }
                >
                  Image 1
                </div>
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                    )
                  }
                >
                  Image 2
                </div>
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://img.freepik.com/free-photo/cool-stylish-smiling-happy-blond-woman-walking-street-with-backpack_285396-1627.jpg?w=1380&t=st=1707010696~exp=1707011296~hmac=955aeca8d3954c874e0959c13a307dff72628157cde894d5ceb9677592752958"
                    )
                  }
                >
                  Image 3
                </div>
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://media.istockphoto.com/id/1333405308/photo/positive-woman-video-calling-using-laptop-at-home.jpg?s=612x612&w=0&k=20&c=0uH6FbjIvWaxW-tdCZltqbGBlAZuQnVlgr6joXsJxUc="
                    )
                  }
                >
                  Image 4
                </div>
                <div
                  className="suggestion"
                  onClick={() =>
                    handleSuggestionClick(
                      "https://img.freepik.com/free-photo/serious-dark-skinned-student-prepares-exam-from-early-morning-writes-important-notes-from-book-into-notebook-lies-unmade-bed-own-room_273609-18697.jpg?w=1380&t=st=1707009276~exp=1707009876~hmac=9543314d6448036fd951c1841f978354c8842ab9e0f8606fc6b7b151ca0f3baa"
                    )
                  }
                >
                  Image 5
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
