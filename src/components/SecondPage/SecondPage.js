import React, { useState } from "react";
import './SecondPage.css'
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import InputForm from "../InputForm/InputForm";
import { pat } from "../../constants/apiKeys";

const SecondPage = () => {
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

 const onButtonSubmit = (event) => {
   event.preventDefault();
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
    <section className="app-page">
      <div className="second-page-content-box">
        <div className="content-left">
          <InputForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={input} box={box} />
              </div>
              <div className="content-right"> <h3>hello</h3></div>
      </div>
    </section>
  );
};

export default SecondPage;
