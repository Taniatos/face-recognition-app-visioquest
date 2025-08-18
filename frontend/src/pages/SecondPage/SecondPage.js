import React, { useState } from "react";
import "./SecondPage.css";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import InputForm from "../InputForm/InputForm";

const SecondPage = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const calculateFaceLocations = (data) => {
    if (data && data.outputs && data.outputs[0]?.data.regions) {
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);

      return data.outputs[0].data.regions.map((region) => {
        const clarifaiFace = region.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
        };
      });
    }
    return [];
  };

  const displayFaceBoxes = (boxes) => {
    setBoxes(boxes);
  };

  const detectFaces = (url) => {
    setIsLoading(true); // Set loading to true before the fetch
    fetch("https://visioquest-backend.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: url }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false); // Set loading to false on success
        if (data && data.outputs) {
          displayFaceBoxes(calculateFaceLocations(data));
        } else {
          setBoxes([]);
        }
      })
      .catch((err) => {
        setIsLoading(false); // Also set loading to false on error
        console.error("Error fetching from proxy server:", err);
      });
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = (event) => {
    event.preventDefault();
    setImageUrl(input);
    detectFaces(input);
  };

  const handleSuggestionClick = (suggestionUrl) => {
    setInput(suggestionUrl);
    setImageUrl(suggestionUrl);
    detectFaces(suggestionUrl);
  };

  return (
    <section className="app-page">
      <div className="second-page-content-box">
        <div className="content-left">
          <InputForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} isLoading={isLoading} />
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
                      "https://samples.clarifai.com/face-det.jpg"
                    )
                  }
                >
                  1
                </div>
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