const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
app.use(express.json());
app.use(cors());

const PAT = process.env.PAT;
const USER_ID = "taniatos";
const APP_ID = "face-test-app";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

app.post("/imageurl", (req, res) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: JSON.stringify({
      user_app_id: { user_id: USER_ID, app_id: APP_ID },
      inputs: [{ data: { image: { url: req.body.input } } }],
    }),
  };

  fetch(
    "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("Unable to work with API");
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});